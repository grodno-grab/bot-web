# Build the self-contained single-file app. The Telegram client (mtcute) is a plain
# npm dependency bundled by Vite, so a single Node stage with no native build suffices.
FROM node:24.14.1-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY index.html vite.config.ts tsconfig.json .env ./
COPY src/ ./src/

# Outputs the self-contained dist/index.html (mtcute + app inlined into one file).
CMD ["npm", "run", "build"]
