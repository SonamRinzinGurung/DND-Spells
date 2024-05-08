import { useEffect, useState } from "react";
import useGetFavorites from "../db/useHandleFavorites";
import { SpellCard, Paginator } from "../components";
import { Spell } from "../types";

const Favorites = () => {
  const { favSpells, addFavState, removeFavState } = useGetFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(favSpells.length / itemsPerPage);

  const [favSpellsPage, setFavSpellsPage] = useState<Spell[]>([]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFavSpellsPage(favSpells.slice(start, end));
  }, [currentPage, favSpells]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="mt-2">
      <h1 className="text-center font-title font-semibold tracking-tight text-primary">
        Favorite <span className="text-primaryDark">Spells</span>
      </h1>

      {favSpells?.length === 0 && (
        <p className="text-xl lg:text-2xl text-center mt-8">
          You do not have any favorite spells
        </p>
      )}
      <div className="flex gap-8 p-6 flex-wrap justify-center">
        {favSpellsPage?.map((spell) => (
          <SpellCard
            key={spell.index}
            spell={spell}
            isFavorite={true}
            removeFavState={removeFavState}
            addFavState={addFavState}
          />
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </main>
  );
};

export default Favorites;
