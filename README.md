# bot-web

A minimal single-page Telegram web client that helps users delete messages found by [@FindMessagesBot](https://t.me/FindMessagesBot). Chat administrators can also mass-delete messages from all participants in a given date range.

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

## Visitor IP addresses

The bootloader, its signed `config.json` and the page are objects in the `grdn` bucket, served directly from `storage.googleapis.com` with no server of ours in between.

For public objects, the bucket owner gets requester IPs (`c_ip`) only from [usage logs](https://docs.cloud.google.com/storage/docs/access-logs#format), which are off unless [enabled](https://docs.cloud.google.com/storage/docs/access-logs#should-you-use) via the bucket's [`logging`](https://docs.cloud.google.com/storage/docs/json_api/v1/buckets#logging) field. [Cloud Audit Logs](https://docs.cloud.google.com/storage/docs/audit-logging#restrictions) do not record access to public objects ([Data Access](https://docs.cloud.google.com/logging/docs/audit#data-access)).

The bucket metadata is readable anonymously:

```sh
curl 'https://storage.googleapis.com/storage/v1/b/grdn?fields=logging,updated'
```

No `logging` key means usage logging is [not enabled](https://docs.cloud.google.com/storage/docs/access-logs#status). [`updated`](https://docs.cloud.google.com/storage/docs/json_api/v1/buckets#updated) is the last metadata change, and toggling logging moves it, so logging has been off continuously since that timestamp. This covers the past only: logging can be enabled at any time, and it would show up here immediately.

## Stack

| Layer | Technology |
|-------|-----------|
| Telegram MTProto | [TDLib](https://github.com/grodno-grab/tdlib-account-export) compiled to WebAssembly (`tdweb`) |
| UI | [Preact](https://preactjs.com/) + TypeScript |
| Build | [Vite](https://vitejs.dev/) + [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) |
| Crypto | Web Crypto API — AES-CBC with a SHA-256 derived key |
| Output | Single self-contained `dist/index.html` (~20 MB, all assets inlined) |

## Development

Local development requires `dist/tdweb.inlined.js` to be present (it contains the TDLib WebAssembly runtime and is built by Docker Stage 1 — see Production build below). The `prestart` script copies it into `public/` and refuses to start the dev server if it is missing.

```sh
# 1. Get dist/tdweb.inlined.js from a prior Docker build (npm start copies it into public/)
# 2. Install dependencies and start the dev server
npm ci
npm start
```

## Production build

The entire build runs inside Docker for byte-reproducible output. Stage 1 compiles TDLib from source (~30–60 min on first run); Stage 2 runs Vite.

```sh
# Build the Docker image (includes full TDLib compilation)
docker build -t bot-web .

# Run the build — output lands in ./dist/index.html
docker run --rm -v "$(pwd)/dist:/app/dist" bot-web
```

To pass real API credentials, create a `.env.local` file (see `.env` for the list of variables) and mount it:

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

The output `dist/index.html` is a fully self-contained file. Host it on immutable or versioned storage and **always give users a URL that includes an explicit version or content ID** — this guarantees they receive exactly the code they expect.

### Options

| Platform | URL format | Notes |
|----------|-----------|-------|
| **IPFS** (Pinata, web3.storage, Filebase) | `https://ipfs.io/ipfs/<CID>` | Content-addressed and immutable by construction |
| **Amazon S3** with object versioning | `https://s3.amazonaws.com/bucket/key?versionId=<id>` | Enable versioning on the bucket |
| **Google Cloud Storage** with versioning | `https://storage.googleapis.com/bucket/key?generation=<id>` | Enable object versioning |

> **Rule:** never give users a bare URL like `https://example.com/index.html` — that URL may silently serve a different version in the future. Always append the version ID or CID so the link is permanently pinned to one specific file.

## GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/build.yml`) that:

1. Builds the Docker image (with layer caching via GitHub Container Registry)
2. Reads `VITE_*` variables from the repository's **Variables** settings (Settings → Secrets and variables → Actions → Variables)
3. Runs the build inside Docker
4. Prints the SHA-256 hash of `dist/index.html`
5. Creates a [SLSA build provenance attestation](https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds) for `dist/index.html`
6. Uploads `index.html` as a downloadable artifact
7. Deploys to Google Cloud Storage and posts the versioned URLs to the job summary

The job summary shows two URLs:
- **Currently on production** — the URL currently stored in `config.json` (the live version)
- **Release candidate** — the freshly uploaded versioned URL

Configure all `VITE_*` variables in the repository settings before triggering the workflow. For automatic deployment, also set the following in repository settings:

| Name | Kind | Description |
|------|------|-------------|
| `GCS_BUCKET` | Variable | Google Cloud Storage bucket name |
| `GCS_OBJECT` | Variable | Object path within the bucket |
| `GCS_CREDENTIALS` | Secret | JSON service-account key with write access |

All three GCS settings must be configured; if any is missing the deploy step fails the workflow.

### Promoting a release to production

`build.yml` only publishes a release candidate — the live version changes solely through the manual `deploy-production.yml` workflow. It takes two inputs, and both must come from the same build run: the release-candidate **URL** and the **SHA-256** printed by that build.

The workflow checks out `web-bootloader`, downloads the page, verifies its build provenance attestation, signs URL and content with `scripts/sign.mjs`, and uploads the resulting `config.json` to the bucket, where the bootloader picks it up on the next page load. A hash that does not match, or a page without a valid attestation, aborts the run — in the case of the hash, before the signing key is used at all.

`sign.yml` runs the same checks and signing but stops short of publishing: it uploads `config.json` as a workflow artifact for manual review or manual upload.

| Name | Kind | Description |
|------|------|-------------|
| `SIGNING_KEY` | Secret | ML-DSA-65 private key whose public half is built into the bootloader |

### Version retention and stale URL cleanup

The deploy script (`scripts/deploy.mjs`) performs two cleanup passes on every run:

**1. Object version pruning** — after uploading a new version of `GCS_OBJECT`, the script reads `config.json` to determine the currently live production URL, then deletes every other version of `GCS_OBJECT` from the bucket. Only two versions are kept: the newly uploaded one and the one currently referenced by `config.json`. This prevents unbounded version accumulation while preserving the ability to roll back.

**2. Config version audit** — the script iterates over all stored versions of `config.json` and inspects the `url` field in each. Any URL that is neither the current production URL nor the new release candidate URL is treated as stale:
- If it points to an object in the same GCS bucket, the script deletes that object.
- If it points elsewhere, the script verifies it returns HTTP 404; if not, it is printed as an error and the process exits with code 1, requiring manual intervention.

`config.json` is a small JSON file stored in the same GCS bucket. It must contain a `url` field pointing to the currently active versioned URL of `GCS_OBJECT`. The deploy script reads it before uploading and uses it to decide which old versions to keep.
