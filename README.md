# bot-web

[Read in russian / Читать на русском](README.ru.md)

A minimal single-page Telegram web client that helps users delete messages found by [@FindMessagesBot](https://t.me/FindMessagesBot). Chat administrators can also mass-delete messages from all participants in a given date range.

## Verify the source

Make sure you received the link to this repository or to the web client directly from the Telegram channel [@Grodno_grab](https://t.me/Grodno_grab), the account [@GrodnograbSOS](https://t.me/GrodnograbSOS), or the bot [@FindMessagesBot](https://t.me/FindMessagesBot). If that is not the case, search Google for the Telegram channel of the initiative "Суды, задержания. Гродно и область" (Courts and detentions. Grodno region) or search for the message-search bot in major media outlets, and verify that the link matches exactly — if it does not, please let us know.

## Usage recommendations

1. Copy the full link `https://s3.amazonaws.com/t.t/t?versionId=iOnWdVSFSj8CwfY7PxekYon5Uy42cIa8` — this guarantees that the code version remains unchanged and unmodified.
2. The link opens a lightweight loader (`boot.html`) that automatically verifies ECDSA P-256 signatures from two independent parties (Grodno Grab and Cyberpartisans) before running any application code. If either signature fails, a red warning screen is shown.
3. Open your browser in **incognito / private mode**, paste the link and open it.
4. Some built-in mobile browsers may not work correctly — use **Firefox** or **Chrome** in that case.

## How it works

After opening the page and completing standard Telegram authentication (phone number → confirmation code → optional 2FA cloud password), the user chooses one of two modes:

### Mode 1 — Delete my messages

1. The page starts `@FindMessagesBot` with a deep-link parameter (`/start wtg`).
2. The bot replies with an AES-CBC-encrypted document containing the list of chats and message IDs to delete.
3. The user confirms deletion; the page calls `deleteMessages` for each chat via TDLib.
4. The bot is notified of the result (`/wtg_done` or `/wtg_fail`), TDLib logs out, and all browser storage (localStorage, sessionStorage, IndexedDB) is wiped.

### Mode 2 — Delete messages as a chat administrator

1. The page loads all of the user's chats and finds supergroups where the user is an admin (or creator) with the "delete messages" permission.
2. The user picks a chat and enters a date range (dd.mm.yyyy).
3. The page scans the chat history for that period and calls `deleteChatMessagesBySender` for every non-bot participant who wrote at least one message in the range. This deletes **all** messages from each such user in the chat, including messages outside the specified dates.
4. One or more verification passes are performed to catch anything missed.
5. The user can then pick another chat or finish. On finish TDLib logs out and all browser storage is wiped.

Everything runs **locally inside the browser**. No data is sent to any third-party server.

## Stack

| Layer | Technology |
|-------|-----------|
| Telegram MTProto | [TDLib](https://github.com/tdlib/td) compiled to WebAssembly (`tdweb`) |
| Crypto | Web Crypto API — AES-CBC with a SHA-256 derived key; ECDSA P-256 signature verification |
| UI | Vanilla HTML/CSS/JS, no frameworks |
| Hosting | Static files on Amazon S3 |

## Security considerations

- **Dual-party code signing.** The application code (`index.html`) is cryptographically signed by two independent parties using ECDSA P-256. A lightweight loader (`boot.html`) verifies both signatures before executing any code. This ensures that no single party can deploy a tampered version.
- The page refuses to run inside an iframe or from an unexpected origin.
- The encrypted payload key is derived from the user's Telegram `user_id` combined with per-document caption material, so the document is only useful to the authenticated user.
- Session data is cleared both on normal completion and on abrupt tab close (`pagehide` / `beforeunload`). On iOS Safari, bfcache restoration is detected and the page is reloaded to prevent stale sessions.

## Files committed

| File | Description |
|------|-------------|
| `boot.html` | Signature-verifying loader (distributed via versioned S3 URL) |
| `index.html` | Application (UI + logic), loaded and verified by `boot.html` |
| `styles.css` | Stylesheet |
| `tdweb.inlined.js` | tdweb bundle with workers inlined |
| `tdlib.wasm` | TDLib WebAssembly binary |
| `bin/sign` | Signs `index.html` with an ECDSA P-256 private key |
| `bin/deploy` | Deploys all files to S3 (with signature verification) |
| `bin/inline-workers` | Inlines tdweb workers into a single bundle and renames the wasm to a stable name |

## Building tdweb

The `tdweb.inlined.js` bundle and `tdlib.wasm` are produced in two steps:

1. Build `tdweb` from the TDLib source following the official guide:
   > https://github.com/tdlib/td/blob/master/example/web/README.md
2. Run `bin/inline-workers` on the webpack output — it embeds the worker scripts into a single `tdweb.inlined.js` file and copies the wasm under the stable name `tdlib.wasm`.

## Verification

The repository includes `Dockerfile.verify` and `verify.sh` that together establish a full trust chain in a single Docker run — **no manual steps, no trust assumptions**.

```bash
git clone https://github.com/grodno-grab/bot-web && cd bot-web
docker build -f Dockerfile.verify -t tdweb-verify .
docker run --rm tdweb-verify
```

### What gets checked (9 checks total)

**Part 1 — Reproducible build (2 checks).**
Inside a clean Ubuntu 24.04 container the full TDLib build pipeline runs from scratch:
OpenSSL 1.1.0l is compiled for WebAssembly with Emscripten 3.1.1, then TDLib
([commit `af0cb1d3`](https://github.com/tdlib/td/commit/af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249), version 1.8.62)
is compiled to WASM, and finally webpack bundles the `tdweb` NPM package — exactly following the [official TDLib instructions](https://github.com/tdlib/td/blob/master/example/web/README.md).
`bin/inline-workers` is then run to embed the workers into a single bundle.
The SHA-256 hashes of the two resulting files (`tdweb.inlined.js`, `tdlib.wasm`) are compared with the copies committed to this repository.

**Part 2 — Deployment check (7 checks).**
1. The versioned S3 URL from this README is fetched and compared with `boot.html` from the repository.
2. `index.html` is downloaded from S3 (without a versionId, exactly as `boot.html` does at runtime) and compared with the repository copy.
3. The versionIds for all three assets (`tdweb.inlined.js`, `styles.css`, `tdlib.wasm`) are extracted from `index.html` and each file is downloaded from S3 and compared with the local repo copy.
4. `index.gg.sig` and `index.cp.sig` are downloaded from S3 and both ECDSA P-256 signatures (Grodno Grab and Cyberpartisans) are verified against the downloaded `index.html` using the public keys embedded in `boot.html`.

Together these two parts prove: the files served to users are byte-for-byte identical to the repository, the repository files are the unmodified output of the standard TDLib build, and the code is signed by both parties.

### Expected output

```
================================================
  tdweb build verification
  TDLib commit: af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249
  Emscripten:   3.1.1
================================================

OK       tdweb.inlined.js
         c56cbb99af3d93d523881eeef46899e2e47d8faf19948d638fa7348b69f40cb2
OK       tdlib.wasm
         7e3b0bd2a492776e9336b3d17851093325cead0da3a4717528e3b608e17459a9

================================================
  Build result: 2 passed, 0 failed
================================================

================================================
  Deployment verification
================================================

Page URL:  https://s3.amazonaws.com/t.t/t?versionId=iOnWdVSFSj8CwfY7PxekYon5Uy42cIa8

Checking  boot.html (t key)    OK
Checking  index.html           OK
Checking  styles.css           OK
Checking  tdweb.inlined.js     OK
Checking  tdlib.wasm           OK
Checking  Grodno Grab signature    OK
Checking  Cyberpartisans signature OK

================================================
  Total result: 9 passed, 0 failed
================================================
```

The container exits with code `0` on success and `1` if any check fails.
