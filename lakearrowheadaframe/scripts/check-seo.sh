#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://lakearrowheadaframe.com}"

echo "== SEO smoke check: $BASE =="

check() {
  local path="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  echo "$code  $path"
  if [[ "$code" != "200" && "$code" != "308" && "$code" != "301" ]]; then
    echo "FAIL: expected 200/301/308 for $path, got $code" >&2
    exit 1
  fi
}

check "/"
check "/robots.txt"
check "/sitemap.xml"
check "/llms.txt"
check "/shoreline-rights"
check "/lake-arrowhead-cabin-with-sauna"
check "/dog-friendly-lake-arrowhead-cabin"
check "/lake-arrowhead-a-frame-cabin"
check "/weekend-from-los-angeles"
check "/chapters"
check "/burnout-reset"
check "/holiday-ready"

echo "-- sitemap sample --"
curl -s "$BASE/sitemap.xml" | head -n 40

echo "-- robots --"
curl -s "$BASE/robots.txt"

echo "OK"
