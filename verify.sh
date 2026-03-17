#!/bin/sh

DIST=/build/td/example/web/tdweb/dist
REF=/reference

ok=0
fail=0

check() {
  name="$1"
  built="$DIST/$name"
  ref="$REF/$name"

  if [ ! -f "$built" ]; then
    printf 'MISSING  %s  (not found in build output)\n' "$name"
    fail=$((fail + 1))
    return
  fi

  h_built=$(sha256sum "$built" | awk '{print $1}')
  h_ref=$(sha256sum "$ref" | awk '{print $1}')

  if [ "$h_built" = "$h_ref" ]; then
    printf 'OK       %s\n         %s\n' "$name" "$h_built"
    ok=$((ok + 1))
  else
    printf 'MISMATCH %s\n  built: %s\n  ref:   %s\n' "$name" "$h_built" "$h_ref"
    fail=$((fail + 1))
  fi
}

printf '================================================\n'
printf '  tdweb build verification\n'
printf '  TDLib commit: af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249\n'
printf '  Emscripten:   3.1.1\n'
printf '================================================\n\n'

# Fixed filename
check "tdweb.js"

# Content-hash filenames — iterate over reference dir
for f in "$REF"/*.worker.js "$REF"/*.wasm; do
  [ -f "$f" ] || continue
  check "$(basename "$f")"
done

printf '\n================================================\n'
printf '  Build result: %d passed, %d failed\n' "$ok" "$fail"
printf '================================================\n'

# ---- Part 2: deployment verification ----
# Download each file from S3 (stored gzip-compressed) and compare
# SHA-256 with the reference copy in /reference/.

BASE="https://s3.amazonaws.com/t.t"

sha256f() {
  sha256sum "$1" | awk '{print $1}'
}

sha256u() {  # download URL → gunzip → sha256
  _tmp=$(mktemp)
  curl -sfL "$1" | gunzip > "$_tmp" 2>/dev/null
  if [ -s "$_tmp" ]; then sha256f "$_tmp"; fi
  rm -f "$_tmp"
}

check_url() {
  label="$1"; url="$2"; file="$3"
  printf 'Checking  %s\n          %s\n' "$label" "$url"
  h_r=$(sha256u "$url")
  if [ -z "$h_r" ]; then
    printf '  ERROR   download/decompress failed\n\n'; fail=$((fail+1)); return
  fi
  h_l=$(sha256f "$file")
  if [ "$h_r" = "$h_l" ]; then
    printf '  OK      %s\n\n' "$h_r"; ok=$((ok+1))
  else
    printf '  MISMATCH\n  remote: %s\n  local:  %s\n\n' "$h_r" "$h_l"; fail=$((fail+1))
  fi
}

printf '\n================================================\n'
printf '  Deployment verification\n'
printf '================================================\n\n'

# Find the versioned S3 page URL from the committed README.md
page_url=$(grep -oE 'https://s3\.amazonaws\.com/t\.t/t\?versionId=[^[:space:]`"'"'"'>]+' \
           /reference/README.md | head -1)
if [ -z "$page_url" ]; then
  printf 'ERROR: S3 URL not found in README.md\n'
  fail=$((fail+1))
else
  printf 'Page URL:  %s\n\n' "$page_url"

  # Download and decompress the live page
  html=$(mktemp); trap 'rm -f "$html"' EXIT
  curl -sfL "$page_url" | gunzip > "$html" 2>/dev/null

  if [ ! -s "$html" ]; then
    printf 'ERROR: Failed to download or decompress page\n'
    fail=$((fail+1))
  else
    # index.html
    printf 'Checking  index.html\n          %s\n' "$page_url"
    h_live=$(sha256f "$html"); h_local=$(sha256f /reference/index.html)
    if [ "$h_live" = "$h_local" ]; then
      printf '  OK      %s\n\n' "$h_live"; ok=$((ok+1))
    else
      printf '  MISMATCH\n  remote: %s\n  local:  %s\n\n' "$h_live" "$h_local"; fail=$((fail+1))
    fi

    # styles.css
    ver=$(grep -oE 'href="styles\.css\?versionId=[^"]+' "$html" | sed 's/.*versionId=//')
    if [ -n "$ver" ]; then
      check_url "styles.css" "${BASE}/styles.css?versionId=${ver}" /reference/styles.css
    else
      printf 'Checking  styles.css\n  ERROR   versionId not found in page\n\n'; fail=$((fail+1))
    fi

    # tdweb.js
    ver=$(grep -oE 'src="tdweb\.js\?versionId=[^"]+' "$html" | sed 's/.*versionId=//')
    if [ -n "$ver" ]; then
      check_url "tdweb.js" "${BASE}/tdweb.js?versionId=${ver}" /reference/tdweb.js
    else
      printf 'Checking  tdweb.js\n  ERROR   versionId not found in page\n\n'; fail=$((fail+1))
    fi

    # workers: 'FILENAME.worker.js': 'VERSIONID'
    for f in /reference/*.worker.js; do
      [ -f "$f" ] || continue
      name=$(basename "$f")
      escaped=$(printf '%s' "$name" | sed 's/\./\\./g')
      ver=$(grep -oE "'${escaped}'[[:space:]]*:[[:space:]]*'[^']+" "$html" \
            | sed "s/.*'[[:space:]]*:[[:space:]]*'//")
      if [ -n "$ver" ]; then
        check_url "$name" "${BASE}/${name}?versionId=${ver}" "$f"
      else
        printf 'Checking  %s\n  ERROR   versionId not found in page\n\n' "$name"; fail=$((fail+1))
      fi
    done

    # wasm: wasmUrl: 'HASH.wasm?versionId=...'
    wasm_ref=$(grep -oE '[0-9a-f]{32}\.wasm\?versionId=[^'"'"']+' "$html" | head -1)
    if [ -n "$wasm_ref" ]; then
      wasm_name=$(printf '%s' "$wasm_ref" | sed 's/?.*//')
      ver=$(printf '%s' "$wasm_ref" | sed 's/.*versionId=//')
      check_url "$wasm_name" "${BASE}/${wasm_name}?versionId=${ver}" "/reference/${wasm_name}"
    else
      printf 'Checking  *.wasm\n  ERROR   versionId not found in page\n\n'; fail=$((fail+1))
    fi
  fi
fi

printf '\n================================================\n'
printf '  Total result: %d passed, %d failed\n' "$ok" "$fail"
printf '================================================\n'

[ "$fail" -eq 0 ]
