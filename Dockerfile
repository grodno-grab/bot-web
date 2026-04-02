# ── Stage 1: Build TDLib WebAssembly ─────────────────────────────────────────
FROM ubuntu:24.04 AS tdlib-builder

ENV DEBIAN_FRONTEND=noninteractive

# Build tools + TDLib dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    gperf \
    git \
    jq \
    make \
    php-cli \
    python3 \
    python3-setuptools \
    sed \
    tar \
    curl \
    xz-utils \
    lbzip2 \
    zlib1g-dev \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Node.js 18 LTS (required for webpack build of tdweb)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Emscripten 3.1.1 (exact version required by TDLib build scripts)
RUN git clone https://github.com/emscripten-core/emsdk.git \
    && cd emsdk \
    && ./emsdk install 3.1.1 \
    && ./emsdk activate 3.1.1

# TDLib at the exact commit that produced the reference files
# Commit: af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249 (version 1.8.62)
RUN git clone https://github.com/tdlib/td.git \
    && cd td \
    && git checkout af0cb1d30a1e5cb1a10cd83b48998ca9ea9ce249

WORKDIR /build/td/example/web

# Build OpenSSL for WebAssembly
RUN bash -c "source /build/emsdk/emsdk_env.sh && ./build-openssl.sh"

# Compile TDLib to WebAssembly
RUN bash -c "source /build/emsdk/emsdk_env.sh && ./build-tdlib.sh"

# Copy WASM into tdweb package sources
RUN ./copy-tdlib.sh

# Build tdweb NPM package (webpack bundles tdweb.js + workers)
RUN bash -c "source /build/emsdk/emsdk_env.sh && ./build-tdweb.sh"

# Inline workers + embed WASM into tdweb.inlined.js
COPY scripts/inline-workers.mjs /build/inline-workers.mjs
RUN node /build/inline-workers.mjs \
    /build/td/example/web/tdweb/dist \
    /build/tdlib-output

# ── Stage 2: Build Vite app ───────────────────────────────────────────────────
FROM node:24.14.1-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

# tdweb.inlined.js (~18 MB) with embedded WASM from Stage 1
COPY --from=tdlib-builder /build/tdlib-output/tdweb.inlined.js ./public/tdweb.inlined.js

COPY index.html vite.config.ts tsconfig.json .env ./

COPY src/ ./src/

CMD ["sh", "-c", "npm run build && gzip -c -9 dist/index.html > dist/index.html.gz"]
