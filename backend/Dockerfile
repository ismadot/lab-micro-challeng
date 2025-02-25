# Usa una imagen oficial de Python
FROM python:3.9

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Instalar herramientas necesarias
RUN apt-get update && apt-get install -y netcat-openbsd postgresql-client

# Copiar archivos necesarios al contenedor
COPY requirements.txt .
COPY database_backup.sql .
COPY . .

# Instalar dependencias
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copiar y hacer ejecutable `wait-for-it.sh`
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Definir el comando de arranque sin populate
# Copiar el script de arranque
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Usar el script de entrada como comando de arranque
ENTRYPOINT ["/entrypoint.sh"]
