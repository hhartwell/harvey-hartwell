#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
html="Harvey Hartwell Resume - Master.html"
pdf="harvey-hartwell-resume.pdf"

if [[ ! -x "$chrome" ]]; then
  echo "Google Chrome was not found at: $chrome" >&2
  exit 1
fi

if [[ ! -f "$html" ]]; then
  echo "Missing $html" >&2
  exit 1
fi

url="$(python3 -c 'import pathlib, sys; print(pathlib.Path(sys.argv[1]).resolve().as_uri())' "$html")"

"$chrome" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$pdf" \
  "$url"

echo "Wrote $pdf"
