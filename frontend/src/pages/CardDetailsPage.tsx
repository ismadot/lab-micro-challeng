import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardDetailsRequest } from "../store/slices/cardsSlice";
import { RootState } from "../store";
import { useParams, useNavigate } from "react-router-dom";

const CardDetailsPage: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: cardDetails, loading: isLoading, error: hasError } = useSelector(
    (state: RootState) => state.card.fetchCardDetails
  );

  useEffect(() => {
    if (cardId) {
      dispatch(fetchCardDetailsRequest({ cardId }));
    }
  }, [dispatch, cardId]);

  if (isLoading) {
    return <p className="text-center text-xl font-semibold text-blue-400">🔄 Cargando datos de la carta...</p>;
  }

  if (hasError) {
    return <p className="text-center text-xl font-semibold text-red-400">❌ Error al cargar la carta. Inténtalo de nuevo.</p>;
  }

  if (!cardDetails) {
    return <p className="text-center text-xl font-semibold text-gray-400">No se encontró la carta. 😢</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
      >
        🔙 Go Back
      </button>

      <h1 className="text-3xl font-bold">{cardDetails.name}</h1>
      <p className="text-lg text-gray-300">#{cardDetails.number}</p>
      <p className="text-xl text-green-300">Tipo: {cardDetails.types.join(", ")}</p>
      <p className="text-lg text-purple-400">Rareza: {cardDetails.rarity}</p>
      <p className="text-lg text-gray-400">{cardDetails.supertype}</p>

      {cardDetails.images?.length > 0 && (
        <img
          src={cardDetails.images[0].url}
          alt={cardDetails.name}
          className="h-80 mt-4 border-4 border-yellow-400 rounded-lg"
        />
      )}

      <div className="mt-4">
        <p className="text-gray-400">Set: {cardDetails.set_id}</p>
        {cardDetails.market_info.url && (
          <a
            href={cardDetails.market_info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            🔗 Ver en el mercado
          </a>
        )}
      </div>
    </div>
  );
};

export default CardDetailsPage;
