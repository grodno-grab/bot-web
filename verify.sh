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

# Single inlined bundle (workers are embedded)
check "tdweb.inlined.js"

# WASM file (content-hash filename) — iterate over reference dir
for f in "$REF"/*.wasm; do
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

gunzipu() {  # download URL → gunzip → file
  curl -sfL "$1" | gunzip > "$2" 2>/dev/null
}

check_url() {
  label="$1"; url="$2"; file="$3"
  printf 'Checking  %s\n          %s\n' "$label" "$url"
  h_remote=$(sha256u "$url")
  if [ -z "$h_remote" ]; then
    printf '  ERROR   download/decompress failed\n\n'; fail=$((fail+1)); return
  fi
  h_local=$(sha256f "$file")
  if [ "$h_remote" = "$h_local" ]; then
    printf '  OK      %s\n\n' "$h_remote"; ok=$((ok+1))
  else
    printf '  MISMATCH\n  remote: %s\n  local:  %s\n\n' "$h_remote" "$h_local"; fail=$((fail+1))
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

  # ---- boot.html (the 't' key) ----
  boot=$(mktemp); trap 'rm -f "$boot" "$html" "$gg_sig_file" "$cp_sig_file"' EXIT
  gunzipu "$page_url" "$boot"

  if [ ! -s "$boot" ]; then
    printf 'ERROR: Failed to download or decompress boot.html\n'
    fail=$((fail+1))
  else
    printf 'Checking  boot.html (t key)\n          %s\n' "$page_url"
    h_live=$(sha256f "$boot"); h_local=$(sha256f /reference/boot.html)
    if [ "$h_live" = "$h_local" ]; then
      printf '  OK      %s\n\n' "$h_live"; ok=$((ok+1))
    else
      printf '  MISMATCH\n  remote: %s\n  local:  %s\n\n' "$h_live" "$h_local"; fail=$((fail+1))
    fi
  fi

  # ---- index.html (fetched without versionId, same as boot.html does) ----
  html=$(mktemp)
  gunzipu "${BASE}/index.html" "$html"

  if [ ! -s "$html" ]; then
    printf 'ERROR: Failed to download or decompress index.html\n'
    fail=$((fail+1))
  else
    printf 'Checking  index.html\n          %s/index.html\n' "$BASE"
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

    # tdweb.inlined.js (workers embedded)
    ver=$(grep -oE 'src="tdweb\.inlined\.js\?versionId=[^"]+' "$html" | sed 's/.*versionId=//')
    if [ -n "$ver" ]; then
      check_url "tdweb.inlined.js" "${BASE}/tdweb.inlined.js?versionId=${ver}" /reference/tdweb.inlined.js
    else
      printf 'Checking  tdweb.inlined.js\n  ERROR   versionId not found in page\n\n'; fail=$((fail+1))
    fi

    # wasm: wasmUrl: 'tdlib.wasm?versionId=...'
    wasm_ref=$(grep -oE 'tdlib\.wasm\?versionId=[^'"'"']+' "$html" | head -1)
    if [ -n "$wasm_ref" ]; then
      ver=$(printf '%s' "$wasm_ref" | sed 's/.*versionId=//')
      check_url "tdlib.wasm" "${BASE}/tdlib.wasm?versionId=${ver}" "/reference/tdlib.wasm"
    else
      printf 'Checking  *.wasm\n  ERROR   versionId not found in page\n\n'; fail=$((fail+1))
    fi
  fi

  # ---- Ed25519 signature verification ----
  gg_sig_file=$(mktemp)  # GG = Grodno Grab
  cp_sig_file=$(mktemp)  # CP = Cyberpartisans
  gunzipu "${BASE}/index.gg.sig" "$gg_sig_file"
  gunzipu "${BASE}/index.cp.sig" "$cp_sig_file"

  if [ ! -s "$gg_sig_file" ] || [ ! -s "$cp_sig_file" ]; then
    [ ! -s "$gg_sig_file" ] && printf 'Checking  index.gg.sig\n  ERROR   download/decompress failed\n\n' && fail=$((fail+1))
    [ ! -s "$cp_sig_file" ] && printf 'Checking  index.cp.sig\n  ERROR   download/decompress failed\n\n' && fail=$((fail+1))
  elif [ ! -s "$html" ]; then
    printf 'Checking  signatures\n  ERROR   index.html not available for verification\n\n'
    fail=$((fail+2))
  else
    # Extract public keys from boot.html
    gg_pub_b64=$(grep 'GRODNO_GRAB_PK' /reference/boot.html \
                 | grep -oE "'[A-Za-z0-9+/=]{40,}'" | tr -d "'")
    cp_pub_b64=$(grep 'CYBERPARTISANS_PK' /reference/boot.html \
                 | grep -oE "'[A-Za-z0-9+/=]{40,}'" | tr -d "'")

    # Read signatures from downloaded files
    gg_sig_b64=$(cat "$gg_sig_file")
    cp_sig_b64=$(cat "$cp_sig_file")

    # ECDSA P-256 signature verification (IEEE P1363 format, r||s 64 bytes).
    # Public key: raw 65-byte uncompressed point (base64), wrapped in SPKI DER at runtime.
    # Uses Node.js instead of openssl CLI: openssl cannot verify P-256 in IEEE P1363
    # (raw r||s) format without extra conversion tooling. Node's crypto module handles
    # it natively. Node is already present in the container as a webpack dependency.
    ecdsa_p256_verify() {
      _label="$1"; _pub_b64="$2"; _sig_b64="$3"; _content="$4"
      printf 'Checking  %s signature\n' "$_label"
      if PUB_B64="$_pub_b64" SIG_B64="$_sig_b64" CONTENT="$_content" \
         node -e "
           const {createPublicKey, verify} = require('crypto');
           const {readFileSync} = require('fs');
           const PREFIX = Buffer.from('3059301306072a8648ce3d020106082a8648ce3d030107034200', 'hex');
           const rawKey = Buffer.from(process.env.PUB_B64, 'base64');
           const pub = createPublicKey({key: Buffer.concat([PREFIX, rawKey]), format:'der', type:'spki'});
           const sig = Buffer.from(process.env.SIG_B64, 'base64');
           const ok = verify('sha256', readFileSync(process.env.CONTENT),
                             {key: pub, dsaEncoding: 'ieee-p1363'}, sig);
           process.exit(ok ? 0 : 1);
         " 2>/dev/null; then
        printf '  OK\n\n'; ok=$((ok+1))
      else
        printf '  FAILED\n\n'; fail=$((fail+1))
      fi
    }

    ecdsa_p256_verify "Grodno Grab"    "$gg_pub_b64" "$gg_sig_b64" "$html"
    ecdsa_p256_verify "Cyberpartisans" "$cp_pub_b64" "$cp_sig_b64" "$html"
  fi
fi

printf '\n================================================\n'
printf '  Total result: %d passed, %d failed\n' "$ok" "$fail"
printf '================================================\n'

[ "$fail" -eq 0 ]
