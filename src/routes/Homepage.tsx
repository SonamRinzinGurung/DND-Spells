import { useState } from "react";
import { useQuery } from "react-query";
import { SpellCard } from "../components";
import useHandleFavorites from "../db/useHandleFavorites";

const Homepage = () => {
  const { favSpells, addFavState, removeFavState } = useHandleFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalSpells, setTotalSpells] = useState(0);
  const BASE_URL = "https://www.dnd5eapi.co";

  const fetchSpells = async (page: number) => {
    const data = await fetch(BASE_URL + "/api/spells");
    const spellsData = await data.json();
    setTotalSpells(spellsData.count);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return await Promise.all(
      spellsData.results
        .slice(start, end)
        .map(async (spell: { url: string }) => {
          const response = await fetch(BASE_URL + spell.url);
          return await response.json();
        })
    );
  };

  const { data, isSuccess } = useQuery(
    ["spells", currentPage],
    () => fetchSpells(currentPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="mt-6 mb-10">
      <h1 className="text-center p-2 mb-2 font-title font-semibold tracking-tight text-primary">
        DND <span className="text-primaryDark">Spells</span>
      </h1>

      <div className="flex gap-8 p-6 flex-wrap justify-center">
        {isSuccess &&
          data.map((spell) => (
            <SpellCard
              key={spell.index}
              spell={spell}
              isFavorite={favSpells.some((fav) => fav.index === spell.index)}
              removeFavState={removeFavState}
              addFavState={addFavState}
            />
          ))}
      </div>
      {isSuccess && (
        <div className="flex gap-4 justify-center flex-wrap mt-4">
          {[...Array(Math.ceil(totalSpells / itemsPerPage))].map(
            (_, i: number) => (
              <button
                className="border-2 p-2 rounded-full w-10 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                key={i}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </main>
  );
};

export default Homepage;
