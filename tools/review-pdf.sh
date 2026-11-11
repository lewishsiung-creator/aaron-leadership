#!/bin/bash
# Makes the 重點複習 PDFs for a lesson, both versions, with Chrome.
#   tools/review-pdf.sh lesson01
# Run it again whenever that lesson's review content or the slides change.
set -e
cd "$(dirname "$0")/.."
L="${1:-lesson01}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for V in work sport; do
  OUT="$PWD/$L/review/$L-review-$V.pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=4000 \
    --print-to-pdf="$OUT" "file://$PWD/$L/review/index.html?v=$V" 2>/dev/null
  echo "$OUT"
done
