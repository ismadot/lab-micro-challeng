from flask import Blueprint, jsonify, request
from models import Card, Image, Market, db

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

@cards_bp.route('/details/<card_id>', methods=['GET'])
def get_card_details(card_id):
    """Devuelve información detallada de una carta específica."""
    card = Card.query.filter_by(id=card_id).first()

    if not card:
        return jsonify({"error": "Card not found"}), 404

    # Obtener imágenes asociadas
    images = Image.query.filter_by(card_id=card.id).all()
    images_data = [{"url": img.url, "type": img.type} for img in images]

    # Obtener datos de mercado (si existen)
    market_data = Market.query.filter_by(card_id=card.id).first()
    market_info = {
        "url": market_data.url if market_data else None,
        "updated_at": market_data.updated_at if market_data else None,
        "market": market_data.market if market_data else None
    }

    return jsonify({
        "id": card.id,
        "name": card.name,
        "supertype": card.supertype,
        "subtypes": card.subtypes,
        "types": card.types,
        "rarity": card.rarity,
        "set_id": card.set_id,
        "number": card.number,
        "images": images_data,
        "market_info": market_info
    })
