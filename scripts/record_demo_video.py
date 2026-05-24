"""Record a 60s walk-through of the RAGTAG live demo with Playwright.

Captures landing page -> /ask -> N1 (Triangular VAT) full pipeline (NER
pulse + plan + graph walk + orbit + cited draft) -> KHO/Vero debate
prompt for the multi-agent debate panel. Saved as webm by Playwright,
then converted to mp4 via ffmpeg for embedding in GitHub READMEs and
the Vercel deploy.

Run from the repo root:

    python scripts/record_demo_video.py

Writes ``lex-atlas-frontend/public/demo.mp4`` and a smaller
``demo-poster.png`` for the landing-page video embed.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

from playwright.sync_api import sync_playwright, Page, BrowserContext


URL = os.environ.get("RAGTAG_DEMO_URL", "https://taxxa-graphrag-demo.vercel.app")
REPO_ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = REPO_ROOT / "lex-atlas-frontend" / "public"
TMP_DIR = REPO_ROOT / ".video-tmp"
FINAL_MP4 = OUT_DIR / "demo.mp4"
POSTER_PNG = OUT_DIR / "demo-poster.jpg"

VIEWPORT = {"width": 1280, "height": 720}


def wait(ms: int) -> None:
    time.sleep(ms / 1000)


def click_demo_prompt(page: Page, tag: str) -> None:
    """Click the first prompt whose tag matches (e.g. 'N1', 'Q4', 'conflict')."""
    page.locator("button", has_text=tag).first.click()


def wait_for_done(page: Page, timeout_ms: int = 25_000) -> None:
    """The chat thread shows phase=done by removing the streaming indicator.
    Cheapest signal: the cost-meter pill appears at the bottom of a turn."""
    page.wait_for_selector("text=/Cost/i", timeout=timeout_ms)


def record(context: BrowserContext) -> Path:
    page = context.new_page()
    page.set_default_timeout(30_000)

    # ── Landing page ────────────────────────────────────────────────
    print("[rec] landing page")
    page.goto(URL, wait_until="networkidle")
    wait(2500)

    # Scroll just enough to reveal the 4-pillar grid below the hero.
    page.mouse.wheel(0, 380)
    wait(2000)

    page.mouse.wheel(0, -380)
    wait(800)

    # Click "Initialize Workspace" -> /ask. The link has the same text.
    print("[rec] -> /ask")
    page.get_by_role("link", name="Initialize Workspace").first.click()
    page.wait_for_url("**/ask")
    wait(2000)

    # ── N1 / Triangular VAT (graph-heavy) ───────────────────────────
    print("[rec] click N1 demo prompt")
    click_demo_prompt(page, "Triangular VAT")
    wait(12_000)  # let the ner_pulse + plan + walked + subgraph_ready land
    # Scroll the orbit into clearer view while draft tokens stream.
    page.mouse.wheel(0, 220)
    wait(8_000)
    # Give the draft a chance to fully stream + cost meter appear.
    try:
        wait_for_done(page, timeout_ms=20_000)
    except Exception:
        pass
    wait(2_500)

    # ── Debate prompt (KHO vs Vero) ─────────────────────────────────
    print("[rec] -> Debate prompt")
    # Scroll to the bottom prompt picker first
    page.mouse.wheel(0, 1500)
    wait(700)
    # Bottom picker has a button labelled "The Debate".
    page.locator("button", has_text="The Debate").first.click()
    wait(11_000)
    page.mouse.wheel(0, 200)
    wait(8_000)
    try:
        wait_for_done(page, timeout_ms=20_000)
    except Exception:
        pass
    wait(3_000)

    # Done - close the page to finalize the video file.
    print("[rec] closing page (Playwright will write the .webm now)")
    video = page.video
    page.close()
    if video is None:
        raise RuntimeError("Playwright did not capture a video")
    return Path(video.path())


def to_mp4(webm: Path, mp4: Path) -> None:
    """Re-encode webm -> mp4 (h264 baseline + AAC silence) for broad support
    in GitHub README + Vercel <video> tags."""
    print(f"[ffmpeg] {webm.name} -> {mp4.name}")
    cmd = [
        "ffmpeg", "-y",
        "-i", str(webm),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "slow",
        "-crf", "26",
        "-movflags", "+faststart",
        "-an",  # no audio
        "-r", "24",
        str(mp4),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def make_poster(mp4: Path, png: Path) -> None:
    """Grab a poster frame ~3.5s in (after the landing hero settles)."""
    print(f"[ffmpeg] poster {png.name}")
    cmd = [
        "ffmpeg", "-y",
        "-ss", "3.5",
        "-i", str(mp4),
        "-vframes", "1",
        "-q:v", "4",
        str(png),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if TMP_DIR.exists():
        shutil.rmtree(TMP_DIR)
    TMP_DIR.mkdir(parents=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"],
        )
        context = browser.new_context(
            viewport=VIEWPORT,
            record_video_dir=str(TMP_DIR),
            record_video_size=VIEWPORT,
            device_scale_factor=2,
            color_scheme="light",
        )
        webm = record(context)
        context.close()
        browser.close()

    if not webm.exists():
        print(f"[err] webm not found at {webm}", file=sys.stderr)
        return 1

    to_mp4(webm, FINAL_MP4)
    make_poster(FINAL_MP4, POSTER_PNG)

    # Clean up the temp webm dir.
    shutil.rmtree(TMP_DIR, ignore_errors=True)

    size_mb = FINAL_MP4.stat().st_size / (1024 * 1024)
    print(f"[done] {FINAL_MP4.relative_to(REPO_ROOT)}  ({size_mb:.2f} MB)")
    print(f"[done] {POSTER_PNG.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
