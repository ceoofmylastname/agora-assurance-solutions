#!/usr/bin/env bash
# Cuts the card orbit clip into the frame sequence the scroll hero scrubs,
# plus a looping video + poster for phones.
#   tools/orbit-frames.sh /path/to/orbit-source.mp4
set -euo pipefail
SRC="${1:?source mp4}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/wholesale/orbit"
FRAMES=96
mkdir -p "$OUT"
rm -f "$OUT"/f*.webp
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
FPS=$(python3 -c "print($FRAMES/$DUR)")
# evenly spaced frames: ffmpeg writes PNG (this ffmpeg has no libwebp), Pillow writes webp q72
TMP="$(mktemp -d)"
ffmpeg -y -loglevel error -i "$SRC" -vf "fps=$FPS,scale=1440:-2" -frames:v $FRAMES "$TMP/f%03d.png"
python3 - "$TMP" "$OUT" <<'PY2'
import sys, pathlib
from PIL import Image
tmp, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
for i, f in enumerate(sorted(tmp.glob('f*.png'))):
    Image.open(f).convert('RGB').save(out / f'f{i:03d}.webp', 'WEBP', quality=72, method=6)
PY2
rm -rf "$TMP"
# phone loop + poster
ffmpeg -y -loglevel error -i "$SRC" -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$ROOT/public/wholesale/orbit-loop.mp4"
ffmpeg -y -loglevel error -i "$SRC" -an -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 33 -deadline good -cpu-used 2 "$ROOT/public/wholesale/orbit-loop.webm"
ffmpeg -y -loglevel error -i "$SRC" -frames:v 1 -vf "scale=1440:-2" -q:v 3 "$ROOT/public/wholesale/orbit-poster.jpg"
echo "frames: $(ls "$OUT" | wc -l)  size: $(du -sh "$OUT" | cut -f1)"
