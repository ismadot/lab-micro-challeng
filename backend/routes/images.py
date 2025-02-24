from flask import Blueprint, jsonify, request
from models import Image, db

images_bp = Blueprint('images', __name__)

@images_bp.route('/<card_id>', methods=['GET'])
def get_images_by_card(card_id):
    """Devuelve las imágenes de una carta específica."""
    images = Image.query.filter_by(card_id=card_id).all()
    if not images:
        return jsonify({"error": "No images found for this card"}), 404
    return jsonify([{
        "id": img.id,
        "card_id": img.card_id,
        "url": img.url,
        "type": img.type
    } for img in images])
