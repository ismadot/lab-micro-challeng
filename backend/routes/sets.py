from flask import Blueprint, jsonify, request
from models import Set, db

sets_bp = Blueprint('sets', __name__)

@sets_bp.route('/', methods=['GET'])
def get_sets():
    sets = Set.query.all()
    return jsonify([{
        "id": s.id,
        "name": s.name,
        "series": s.series,
        "printed_total": s.printed_total,
        "total": s.total,
        "ptcgo_code": s.ptcgo_code,
        "release_date": s.release_date,
        "updated_at": s.updated_at,
        "symbol_url": s.symbol_url,
        "logo_url": s.logo_url
    } for s in sets])

@sets_bp.route('/<set_id>', methods=['GET'])
def get_set(set_id):
    s = Set.query.get(set_id)
    if not s:
        return jsonify({"error": "Set not found"}), 404
    return jsonify({
        "id": s.id,
        "name": s.name,
        "series": s.series,
        "printed_total": s.printed_total,
        "total": s.total,
        "ptcgo_code": s.ptcgo_code,
        "release_date": s.release_date,
        "updated_at": s.updated_at,
        "symbol_url": s.symbol_url,
        "logo_url": s.logo_url
    })
