#!/bin/bash

# Reset and rebuild the database
echo "🔄 Resetting database..."

# Remove existing database
rm -f prisma/dev.db

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "🏗️  Creating database schema..."
npx prisma db push

# Seed the database
echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Database reset complete!"
echo "🚀 You can now run: npm run dev"