from flask import Blueprint, jsonify, request
from models import Market, db

market_bp = Blueprint('markets', __name__)

@market_bp.route('/<card_id>', methods=['GET'])
def get_market_info(card_id):
    """Devuelve la información de mercado de una carta específica."""
    market_entries = Market.query.filter_by(card_id=card_id).all()
    if not market_entries:
        return jsonify({"error": "No market data found for this card"}), 404
    return jsonify([{
        "id": m.id,
        "card_id": m.card_id,
        "url": m.url,
        "updated_at": m.updated_at,
        "market": m.market
    } for m in market_entries])
