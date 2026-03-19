# bot-web

[Read in russian / Читать на русском](README.ru.md)

A minimal single-page Telegram web client that helps users delete messages found by [@FindMessagesBot](https://t.me/FindMessagesBot). Chat administrators can also mass-delete messages from all participants in a given date range.

## Verify the source

Make sure you received the link to this repository or to the web client directly from the Telegram channel [@Grodno_grab](https://t.me/Grodno_grab), the account [@GrodnograbSOS](https://t.me/GrodnograbSOS), or the bot [@FindMessagesBot](https://t.me/FindMessagesBot). If that is not the case, search Google for the Telegram channel of the initiative "Суды, задержания. Гродно и область" (Courts and detentions. Grodno region) or search for the message-search bot in major media outlets, and verify that the link matches exactly — if it does not, please let us know.

## Usage recommendations

1. Copy the full link `https://s3.amazonaws.com/t.t/t?versionId=J1qgAjJ_PtiziFkd85OVnAjDAinW5FJJ` — this guarantees that the code version remains unchanged and unmodified.
2. Open your browser in **incognito / private mode**, paste the link and open it.
3. Some built-in mobile browsers may not work correctly — use **Firefox** or **Chrome** in that case.
4. Open the page source (usually **Ctrl+U**), review it, and make sure it matches this repository exactly.

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
| Crypto | Web Crypto API — AES-CBC with a SHA-256 derived key |
| UI | Vanilla HTML/CSS/JS, no frameworks |
| Hosting | Static files on Amazon S3 |

## Security considerations

- The page refuses to run inside an iframe or from an unexpected origin.
- The encrypted payload key is derived from the user's Telegram `user_id` combined with per-document caption material, so the document is only useful to the authenticated user.
- Session data is cleared both on normal completion and on abrupt tab close (`pagehide` / `beforeunload`). On iOS Safari, bfcache restoration is detected and the page is reloaded to prevent stale sessions.

## Files committed

| File | Description |
|------|-------------|
| `index.html` | Entire application (UI + logic) |
| `styles.css` | Stylesheet |
| `tdweb.js` | tdweb bundle |
| `*.wasm` | TDLib WebAssembly binary |
| `*.worker.js` | TDLib worker scripts |

## Building tdweb

The `tdweb.js` bundle and the accompanying `.wasm` / `.worker.js` files are built from the TDLib source following the official guide:

> https://github.com/tdlib/td/blob/master/example/web/README.md

## Verification

The repository includes `Dockerfile.verify` and `verify.sh` that together establish a full trust chain in a single Docker run — **no manual steps, no trust assumptions**.

```bash
git clone https://github.com/grodno-grab/bot-web && cd bot-web
docker build -f Dockerfile.verify -t tdweb-verify .
docker run --rm tdweb-verify
```

### What gets checked (10 checks total)

**Part 1 — Reproducible build (4 checks).**
Inside a clean Ubuntu 24.04 container the full TDLib build pipeline runs from scratch:
OpenSSL 1.1.0l is compiled for WebAssembly with Emscripten 3.1.1, then TDLib
([commit `af0cb1d3`](https://github.com/tdlib/td/commit/af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249), version 1.8.62)
is compiled to WASM, and finally webpack bundles the `tdweb` NPM package — exactly following the [official TDLib instructions](https://github.com/tdlib/td/blob/master/example/web/README.md).
The SHA-256 hashes of the four resulting files (`tdweb.js`, two `.worker.js`, `.wasm`) are compared with the copies committed to this repository.

**Part 2 — Deployment check (6 checks).**
The versioned S3 URL from this README is fetched, the live page is compared with `index.html`, and then the versionIds for all five assets (`tdweb.js`, `styles.css`, two workers, `wasm`) are extracted from the page and each file is downloaded from S3 and compared with the local repo copy.

Together these two parts prove: the files served to users are byte-for-byte identical to the repository, and the repository files are the unmodified output of the standard TDLib build.

### Expected output

```
================================================
  tdweb build verification
  TDLib commit: af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249
  Emscripten:   3.1.1
================================================

OK       tdweb.js
         f1ffb1209e6a00bf52017a46edf6e13bb3edb20a691b0ed23bdfecd723dbcb38
OK       1.ce70fb8f3c7a4342d115.worker.js
         1635989cdac976ed607126ccac57361dd715e6c7bc530ba0a6fdf5abe33e7a91
OK       ce70fb8f3c7a4342d115.worker.js
         f6600e2930124bcbdf66de7c3a255942aae14712c199537fa135b0bbc395b5d4
OK       5e206a8f21790c38ae50cf54b7b9aca7.wasm
         7e3b0bd2a492776e9336b3d17851093325cead0da3a4717528e3b608e17459a9

================================================
  Build result: 4 passed, 0 failed
================================================

================================================
  Deployment verification
================================================

Page URL:  https://s3.amazonaws.com/t.t/t?versionId=J1qgAjJ_PtiziFkd85OVnAjDAinW5FJJ

Checking  index.html        OK
Checking  styles.css        OK
Checking  tdweb.js          OK
Checking  1.ce7...worker.js OK
Checking  ce7...worker.js   OK
Checking  5e20...wasm       OK

================================================
  Total result: 10 passed, 0 failed
================================================
```

The container exits with code `0` on success and `1` if any check fails.
