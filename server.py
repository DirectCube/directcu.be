"""Static server for directcu.be (Pterodactyl Python egg).

On start, when AUTO_UPDATE=1 (set by the egg), it hard-resets the checkout to
its upstream branch so force-pushes never leave the container on stale code,
then restarts itself if anything changed. Running it locally without
AUTO_UPDATE skips the git step, so it never touches a working copy.

Only the site itself is served: index.html, favicon.ico, assets/, css/ and js/.
Dotfiles (.git, .local, ...), this script and anything else in the container
return 404, and directory listings are off.

Env: SERVER_PORT (default 6464), HOST (default 0.0.0.0), AUTO_UPDATE.
"""

import os
import posixpath
import subprocess
import sys
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
PUBLIC_FILES = {"index.html", "favicon.ico"}
PUBLIC_DIRS = {"assets", "css", "js"}


def log(msg):
    print(msg, flush=True)


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, timeout=60)


def sync_from_git():
    """Reset the checkout to its upstream. Returns True if HEAD moved."""
    if os.environ.get("AUTO_UPDATE") != "1" or not (ROOT / ".git").is_dir():
        return False
    try:
        before = git("rev-parse", "HEAD").stdout.strip()
        for step in (("fetch", "--prune", "origin"), ("reset", "--hard", "@{u}")):
            result = git(*step)
            if result.returncode:
                log(f"git {step[0]} failed, serving current files: {result.stderr.strip()}")
                return False
        after = git("rev-parse", "HEAD").stdout.strip()
    except (OSError, subprocess.SubprocessError) as exc:
        log(f"git sync skipped: {exc}")
        return False
    log(f"Synced to {after[:7]}" + ("" if after == before else f" (was {before[:7]})"))
    return after != before


def is_public(url_path):
    path = posixpath.normpath(unquote(urlsplit(url_path).path))
    parts = [p for p in path.split("/") if p]
    if not parts:
        return True
    if any(p.startswith(".") for p in parts):
        return False
    if len(parts) == 1:
        return parts[0] in PUBLIC_FILES
    return parts[0] in PUBLIC_DIRS


class SiteHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".png": "image/png",
        ".ico": "image/x-icon",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".txt": "text/plain; charset=utf-8",
    }

    def send_head(self):
        if not is_public(self.path):
            self.send_error(HTTPStatus.NOT_FOUND)
            return None
        return super().send_head()

    def version_string(self):
        return "directcu.be"

    def list_directory(self, path):
        self.send_error(HTTPStatus.NOT_FOUND)
        return None

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main():
    if sync_from_git():
        log("Code changed, restarting with the new version")
        os.execv(sys.executable, [sys.executable, *sys.argv])

    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("SERVER_PORT", "6464"))
    handler = partial(SiteHandler, directory=str(ROOT))
    with ThreadingHTTPServer((host, port), handler) as httpd:
        log(f"Serving directcu.be from {ROOT} on {host}:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            log("Stopped")


if __name__ == "__main__":
    main()
