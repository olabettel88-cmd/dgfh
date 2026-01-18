#!/bin/sh
set -e

echo "=== Running database push ==="
npm run db:push

echo "=== Database push complete ==="
echo "=== Starting Node.js server ==="

# Start the server
exec node dist/index.cjs
