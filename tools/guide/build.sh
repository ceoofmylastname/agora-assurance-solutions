#!/usr/bin/env bash
# Renders the Agora Wholesale partner guide.
#   tools/guide/build.sh
#   → public/wholesale/agora-wholesale-guide.pdf  (Letter, 12 pages)
#   → public/wholesale/guide-cover.{jpg,webp}     (page 1, 880×1139, shown on /wholesale)
# Source: tools/guide/guide.html (print CSS, Google Fonts, images from public/wholesale).
# Needs Google Chrome and poppler (pdftoppm). After a re-render, bump V in the
# pages that link the PDF or the cover, because /* is cached for a year.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/tools/guide/guide.html"
OUT="$ROOT/public/wholesale/agora-wholesale-guide.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=20000 --user-data-dir="$TMP/profile" \
  --print-to-pdf="$OUT" "file://$SRC" 2>/dev/null
pdftoppm -f 1 -l 1 -r 110 -jpeg -jpegopt quality=88 "$OUT" "$TMP/cover"
python3 - "$TMP" "$ROOT/public/wholesale" <<'PY'
import sys, pathlib
from PIL import Image
tmp, pub = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
canvas = Image.open(next(tmp.glob('cover*.jpg'))).convert('RGB').resize((880, 1139), Image.LANCZOS)
canvas.save(pub / 'guide-cover.jpg', quality=86)
canvas.save(pub / 'guide-cover.webp', 'WEBP', quality=84, method=6)
print('cover', canvas.size)
PY
rm -rf "$TMP"
python3 -c "import pypdf,sys; r=pypdf.PdfReader(sys.argv[1]); print('pages', len(r.pages))" "$OUT"
ls -la "$OUT"
