#!/usr/bin/env bash
# Render Facebook ad creatives from the HTML templates.
# Usage: ./build.sh   (override browser with CHROME=/path/to/chrome)
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="${CHROME:-google-chrome}"

render() {
  local out="$1" w="$2" h="$3" url="$4"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=1 --virtual-time-budget=3500 \
    --window-size="$w,$h" --screenshot="$DIR/$out" "$url" >/dev/null 2>&1
  echo "  $out  (${w}x${h})"
}

echo "Rendering creatives into $DIR"
for v in 1 2 3 4; do
  render "ad$v-square.png"   1080 1080 "file://$DIR/creative.html?v=$v"
  render "ad$v-portrait.png" 1080 1350 "file://$DIR/creative.html?v=$v"
done
echo "Done."
