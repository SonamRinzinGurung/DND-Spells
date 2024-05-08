import { useState } from "react";
import { useQuery } from "react-query";
import { SpellCard, Spinner, Paginator } from "../components";
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

  const { data, isFetching } = useQuery(
    ["spells", currentPage],
    () => fetchSpells(currentPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="mt-2">
      <h1 className="text-center font-title font-semibold tracking-tight text-primary">
        DND <span className="text-primaryDark">Spells</span>
      </h1>

      {!isFetching && data?.length === 0 && (
        <div>
          <p className="text-xl lg:text-2xl text-center mt-8 font-bold">
            There are no spells here
          </p>
        </div>
      )}

      <div className="flex gap-8 p-6 flex-wrap justify-center">
        {!isFetching ? (
          data?.map((spell) => (
            <SpellCard
              key={spell.index}
              spell={spell}
              isFavorite={favSpells.some((fav) => fav.index === spell.index)}
              removeFavState={removeFavState}
              addFavState={addFavState}
            />
          ))
        ) : (
          <Spinner size="medium" />
        )}
      </div>
      {!isFetching && (
        <Paginator
          currentPage={currentPage}
          totalPages={Math.ceil(totalSpells / itemsPerPage)}
          paginate={paginate}
        />
      )}
    </main>
  );
};

export default Homepage;
