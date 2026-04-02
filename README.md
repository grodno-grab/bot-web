# bot-web

A minimal single-page Telegram web client that helps users delete messages found by
[@FindMessagesBot](https://t.me/FindMessagesBot). Chat administrators can also mass-delete
messages from all participants in a given date range.

## How it works

After opening the page and completing standard Telegram authentication
(phone number → confirmation code → optional 2FA cloud password),
the user chooses one of two modes:

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
| UI | [Preact](https://preactjs.com/) + TypeScript |
| Build | [Vite](https://vitejs.dev/) + [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) |
| Crypto | Web Crypto API — AES-CBC with a SHA-256 derived key |
| Output | Single self-contained `dist/index.html` (~20 MB, all assets inlined) |

## Development

Local development requires `public/tdweb.inlined.js` to be present (it contains the TDLib
WebAssembly runtime and is built by Docker Stage 1 — see Production build below).

```sh
# 1. Get public/tdweb.inlined.js from a prior Docker build or build it yourself (see below)
# 2. Install dependencies and start the dev server
npm install
npm start
```

## Production build

The entire build runs inside Docker for byte-reproducible output.
Stage 1 compiles TDLib from source (~30–60 min on first run); Stage 2 runs Vite.

```sh
# Build the Docker image (includes full TDLib compilation)
docker build -t bot-web .

# Run the build — output lands in ./dist/index.html
docker run --rm -v "$(pwd)/dist:/app/dist" bot-web
```

To pass real API credentials, create a `.env.local` file (see `.env` for the list
of variables) and mount it:

```sh
docker run --rm \
  -v "$(pwd)/.env.local:/app/.env.local:ro" \
  -v "$(pwd)/dist:/app/dist" \
  bot-web
```

## Configuration

Copy `.env` to `.env.local` and fill in the values:

| Variable | Description |
|----------|-------------|
| `VITE_API_ID` | Telegram application API ID |
| `VITE_API_HASH` | Telegram application API hash |
| `VITE_BOT_CHAT_ID` | Numeric chat ID of @FindMessagesBot |
| `VITE_BOT_USERNAME` | Bot username (default: `FindMessagesBot`) |
| `VITE_BOT_START_PARAMETER` | Deep-link parameter (default: `wtg`) |
| `VITE_BOT_COMMAND_SUCCESS` | Success command sent to bot (default: `/wtg_done`) |
| `VITE_BOT_COMMAND_FAILURE` | Failure command sent to bot (default: `/wtg_fail`) |

## Hosting recommendations

The output `dist/index.html` is a fully self-contained file. Host it on immutable or
versioned storage and **always give users a URL that includes an explicit version or
content ID** — this guarantees they receive exactly the code they expect.

### Options

| Platform | URL format | Notes |
|----------|-----------|-------|
| **IPFS** (Pinata, web3.storage, Filebase) | `https://ipfs.io/ipfs/<CID>` | Content-addressed and immutable by construction |
| **Amazon S3** with object versioning | `https://s3.amazonaws.com/bucket/key?versionId=<id>` | Enable versioning on the bucket |
| **Google Cloud Storage** with versioning | `https://storage.googleapis.com/bucket/key?generation=<id>` | Enable object versioning |

> **Rule:** never give users a bare URL like `https://example.com/index.html` — that URL
> may silently serve a different version in the future. Always append the version ID or CID
> so the link is permanently pinned to one specific file.

## GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/build.yml`) that:

1. Builds the Docker image (with layer caching via GitHub Container Registry)
2. Reads `VITE_*` variables from the repository's **Variables** settings (Settings → Secrets and variables → Actions → Variables)
3. Runs the build inside Docker
4. Prints the SHA-256 hash of `dist/index.html`
5. Uploads `index.html` as a downloadable artifact
6. Deploys to Google Cloud Storage and posts the versioned URL to the job summary

Configure all `VITE_*` variables in the repository settings before triggering the workflow.
For automatic deployment, also set the following in repository settings:

| Name | Kind | Description |
|------|------|-------------|
| `GCS_BUCKET` | Variable | Google Cloud Storage bucket name |
| `GCS_OBJECT` | Variable | Object path within the bucket |
| `GCS_CREDENTIALS` | Secret | JSON service-account key with write access |

All three GCS settings must be configured; if any is missing the deploy step fails the workflow.
