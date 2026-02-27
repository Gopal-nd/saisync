#!/bin/bash

set -e


echo "Remove existing Docker containers..."
docker compose down

echo "🚀 Starting Docker services..."
docker compose up -d

DATABASE_URL="postgresql://root:root@localhost:5400/pg?schema=public"
echo "📝 Creating env files..."

# packages/db
mkdir -p packages/db
cat > packages/db/.env <<EOF
DATABASE_URL=$DATABASE_URL
EOF

echo "Install Packages!"
bun install

echo "🔁 Running Prisma db push..."
bun db:push

echo "🔁 Running Prisma generate..."
bun db:generate

echo "🏗 Building application..."
bun run build

echo "▶ Starting Application..."
exec bun run start