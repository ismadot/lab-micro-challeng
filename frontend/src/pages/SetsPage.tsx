import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetsRequest } from "../store/slices/setsSlice";
import { RootState } from "../store";
import Paginator from "../components/Paginator";
import { Link } from "react-router-dom";

const SetsPage: React.FC = () => {
  const dispatch = useDispatch();
  const {data:setsData, loading:isLoading, error:hasError}  = useSelector((state: RootState) => state.set.fetchSets);
  const sets = useMemo(() => setsData?.sets || [], [setsData]);


  const totalSets = sets.length;
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchSetsRequest());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Pokémon TCG Sets</h1>

      {isLoading && <p className="text-center text-yellow-400">⏳ Cargando sets...</p>}

      {hasError && (
        <p className="text-center text-red-500">
          ❌ Error al cargar los sets. Intenta de nuevo más tarde.
        </p>
      )}

      {!isLoading && !hasError && sets.length === 0 && (
        <p className="text-center text-gray-400">⚠️ No hay sets disponibles.</p>
      )}

      {sets.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {sets.slice((currentPage - 1) * perPage, currentPage * perPage).map((set) => (
               <Link key={set.id} to={`/sets/${set.id}/cards`}>
               <div className="border-4 border-yellow-400 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all bg-gray-800 text-center">
                 {/* Agregar el símbolo del set */}
                 <img src={set.symbol_url} alt={`${set.name} Symbol`} className="h-10 mx-auto mb-2" />
                 {/* Agregar el logo del set */}
                 <img src={set.logo_url} alt={set.name} className="h-20 mx-auto" />
                 <h2 className="text-xl font-semibold text-white mt-2">{set.name}</h2>
                 <p className="text-gray-300">{set.series}</p>
                 <p className="text-gray-500">📅 Lanzado el: {set.release_date}</p>
               </div>
             </Link>
            ))}
          </div>
          <Paginator
            currentPage={currentPage}
            totalPages={Math.ceil(totalSets / perPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SetsPage;
