#!/usr/bin/env bash
set -e

HOST=$1
PORT=$2

if [[ -z "$HOST" || -z "$PORT" ]]; then
  echo "❌ Error: Missing host or port. Usage: ./wait-for-it.sh <host> <port>"
  exit 1
fi

echo "🔄 Waiting for $HOST:$PORT to be available..."
while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done

echo "✅ $HOST:$PORT is available! Running command: ${@:3}"
exec "${@:3}"
