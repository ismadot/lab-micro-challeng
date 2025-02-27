import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardsRequest } from "../store/slices/cardsSlice";
import { RootState } from "../store";
import { useParams, Link } from "react-router-dom";
import Filter from "../components/Filter";
import Paginator from "../components/Paginator";

const CardsPage: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const dispatch = useDispatch();

  const { data: cardsData, loading: isLoading, error: hasError } = useSelector(
    (state: RootState) => state.card.fetchCards
  );

  const cards = useMemo(() => cardsData?.cards || [], [cardsData]);
  const totalCards = cards.length;

  const [filteredCards, setFilteredCards] = useState(cards);
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (setId) {
      dispatch(fetchCardsRequest({ setId }));
    }
  }, [dispatch, setId]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  // 🚀 **Filtrado en tiempo real**
  useEffect(() => {
    if (filter.length >= 3 || filter === "") {
      const filtered = cards.filter((card) =>
        card.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [filter, cards]);

  const handleFilterChange = (searchTerm: string) => {
    setFilter(searchTerm);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🃏 Cartas del Set</h1>

      {/* Estado de carga */}
      {isLoading && (
        <p className="text-center text-lg font-semibold text-blue-400">🔄 Cargando cartas...</p>
      )}

      {/* Estado de error */}
      {hasError && (
        <p className="text-center text-lg font-semibold text-red-400">
          ❌ Error al cargar las cartas. Inténtalo de nuevo.
        </p>
      )}

      <Filter onFilterChange={handleFilterChange} onPerPageChange={handlePerPageChange} />

      {!isLoading && !hasError && filteredCards.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {filteredCards
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((card) => (
                <Link key={card.id} to={`/cards/${card.id}`}>
                  <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all bg-gray-800 text-center hover:bg-gray-700">
                    <h2 className="text-xl font-semibold text-white mt-2">{card.name}</h2>
                    <p className="text-gray-300">#{card.number}</p>
                    <p className="text-lg text-green-300">{card.types.join(", ")}</p>
                    <p className="text-lg text-purple-400">{card.rarity}</p>
                  </div>
                </Link>
              ))}
          </div>

          <Paginator
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCards.length / perPage)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        !isLoading &&
        !hasError && (
          <p className="text-center text-lg font-semibold text-gray-400">
            No hay cartas disponibles. 😢
          </p>
        )
      )}
    </div>
  );
};

export default CardsPage;
