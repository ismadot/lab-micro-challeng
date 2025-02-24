from flask import Flask, jsonify
from flask_cors import CORS
import argparse
from config import Config
import logging
import os
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text
from dotenv import load_dotenv
import psycopg2

from routes.sets import sets_bp
from routes.cards import cards_bp
from routes.images import images_bp
from routes.market import market_bp
from models import db

# Cargar variables de entorno
load_dotenv()

# Configurar logging
logging.basicConfig(level=logging.INFO)

def create_database():
    """Verifica si la base de datos `pokemon_tcg` existe y, si no, la crea."""
    db_url = os.getenv("DATABASE_URL")

    if not db_url:
        logging.error("❌ No DATABASE_URL found in environment variables!")
        return

    db_params = db_url.replace("postgresql://", "").split("@")
    user_pass, host_db = db_params
    user, password = user_pass.split(":")
    host, db_name = host_db.split("/")

    try:
        conn = psycopg2.connect(
            dbname="postgres", user=user, password=password, host=host, port=5432
        )
        conn.autocommit = True
        cur = conn.cursor()

        # Verificar si la base de datos existe
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s;", (db_name,))
        exists = cur.fetchone()

        if not exists:
            logging.info(f"🆕 Database `{db_name}` does not exist. Creating it...")
            cur.execute(f"CREATE DATABASE {db_name};")
            logging.info(f"✅ Database `{db_name}` created successfully.")

        cur.close()
        conn.close()

    except psycopg2.Error as e:
        logging.error(f"❌ Error checking/creating database `{db_name}`: {e}")

def check_if_db_is_empty():
    """Verifica si la base de datos tiene registros en la tabla `set`."""
    try:
        conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM set;")
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        return count == 0  # Retorna `True` si la tabla está vacía
    except psycopg2.Error as e:
        logging.error(f"❌ Error checking if database is empty: {e}")
        return True  # En caso de error, asumimos que está vacía

def populate_database():
    """Ejecuta `database_backup.sql` usando `psql` para manejar `COPY FROM stdin` correctamente."""
    sql_file = "database_backup.sql"
    db_url = os.getenv("DATABASE_URL")

    if not os.path.exists(sql_file):
        logging.warning(f"⚠️ No se encontró `{sql_file}`. No se puede poblar la base de datos.")
        return

    if check_if_db_is_empty():
        logging.info(f"📥 Poblando la base de datos con `{sql_file}` usando `psql`...")
        command = f'PGPASSWORD="{os.getenv("PGPASSWORD")}" psql {db_url} -f {sql_file}'
        os.system(command)
        logging.info("✅ Base de datos poblada correctamente.")
    else:
        logging.info("✅ La base de datos ya contiene datos. No es necesario poblarla.")

def create_app():
    create_database()  # Verificar y crear la base de datos si no existe

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(Config)

    db.init_app(app)

    app.register_blueprint(sets_bp, url_prefix='/set')
    app.register_blueprint(cards_bp, url_prefix='/card')
    app.register_blueprint(images_bp, url_prefix='/image')
    app.register_blueprint(market_bp, url_prefix='/market')

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok"}), 200

    return app

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Gestor de base de datos y servidor Flask")
    parser.add_argument("--populate", action="store_true", help="Poblar la base de datos con `database_backup.sql`")

    args = parser.parse_args()

    if args.populate:
        populate_database()
        exit(0)

    app = create_app()
    app.run(host="0.0.0.0", port=5002, debug=True)
