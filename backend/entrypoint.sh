#!/bin/bash

# Esperar a que la base de datos esté lista
echo "⏳ Esperando a que la base de datos esté disponible..."
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1" > /dev/null 2>&1; do
  echo "📌 Esperando la conexión a PostgreSQL..."
  sleep 2
done

echo "✅ La base de datos está lista."

# Verificar si la base de datos está vacía
TABLE_COUNT=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | xargs)

if [ "$TABLE_COUNT" -eq "0" ]; then
  echo "📥 La base de datos está vacía. Poblando con database_backup.sql..."
  python app.py --populate
else
  echo "✅ La base de datos ya tiene datos. Saltando población."
fi

# Iniciar la aplicación normalmente
echo "🚀 Iniciando el backend..."
exec python app.py
