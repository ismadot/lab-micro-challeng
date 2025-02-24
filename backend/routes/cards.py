from flask import Blueprint, jsonify, request
from models import Card, db

cards_bp = Blueprint('cards', __name__)

@cards_bp.route('/', methods=['GET'])
def get_cards():
    """Devuelve todas las cartas."""
    cards = Card.query.all()
    return jsonify([{
        "id": c.id,
        "name": c.name,
        "supertype": c.supertype,
        "subtypes": c.subtypes,
        "types": c.types,
        "rarity": c.rarity,
        "set_id": c.set_id,
        "number": c.number
    } for c in cards])

@cards_bp.route('/<set_id>', methods=['GET'])
def get_cards_by_set(set_id):
    """Devuelve las cartas de un set específico."""
    cards = Card.query.filter_by(set_id=set_id).all()
    if not cards:
        return jsonify({"error": "No cards found for this set"}), 404
    return jsonify([{
        "id": c.id,
        "name": c.name,
        "supertype": c.supertype,
        "subtypes": c.subtypes,
        "types": c.types,
        "rarity": c.rarity,
        "set_id": c.set_id,
        "number": c.number
    } for c in cards])
