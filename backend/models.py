from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

class Set(db.Model):
    __tablename__ = "set"  # Nombre correcto de la tabla en la base de datos

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    series = db.Column(db.String)
    printed_total = db.Column(db.Integer)
    total = db.Column(db.Integer)
    ptcgo_code = db.Column(db.String)
    release_date = db.Column(db.Date)
    updated_at = db.Column(db.DateTime)
    symbol_url = db.Column(db.String)
    logo_url = db.Column(db.String)

class Card(db.Model):
    __tablename__ = "card"

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    supertype = db.Column(db.String)
    subtypes = db.Column(db.String)
    types = db.Column(db.String)
    set_id = db.Column(db.String, db.ForeignKey('set.id'))  # Relación con `set`
    number = db.Column(db.String)
    rarity = db.Column(db.String)

class Image(db.Model):
    __tablename__ = "image"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    card_id = db.Column(db.String, db.ForeignKey('card.id'))  # Relación con `card`
    url = db.Column(db.String)
    type = db.Column(db.String)

class Market(db.Model):
    __tablename__ = "market"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    card_id = db.Column(db.String, db.ForeignKey('card.id'))  # Relación con `card`
    url = db.Column(db.String)
    updated_at = db.Column(db.Date)
    market = db.Column(db.String)
