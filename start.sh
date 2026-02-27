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

# apps/`backend`

mkdir -p apps/backend

cat > apps/backend/.env <<EOF
DATABASE_URL=$DATABASE_URL
PORT=9000
FRONTEND_URL='https://saisync.gopalnd.cloud'
SECRET_KEY='secret'
EOF



cat > apps/next-web/.env <<EOF
NEXT_PUBLIC_BACKEND_URL='https://saisync-api.gopalnd.cloud'
NEXT_PUBLIC_URL='https://saisync.gopalnd.cloud'
NEXT_PUBLIC_GOOGLE_API_KEY=''
UPLOADTHING_TOKEN=''
EOF

echo "Install Packages!"
bun install

echo "🔁 Running Prisma db push..."
bun db:push

echo "🔁 Running Prisma generate..."
bun db:generate

echo "🔁 Running Prisma seed..."
bun db:seed

echo "🏗 Building application..."
bun run build

echo "▶ Starting Application..."
exec bun run start