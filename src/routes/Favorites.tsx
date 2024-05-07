import useGetFavorites from "../db/useHandleFavorites";
import { SpellCard } from "../components";

const Favorites = () => {
  const { favSpells, addFavState, removeFavState } = useGetFavorites();

  return (
    <main className="mt-6 mb-10">
      <h1 className="text-center p-2 mb-2 font-title font-semibold tracking-tight text-primary">
        Favorite <span className="text-primaryDark">Spells</span>
      </h1>

      {favSpells?.length === 0 && (
        <p className="text-3xl text-center mt-8">
          You do not have any favorite spells
        </p>
      )}
      <div className="flex gap-8 p-6 flex-wrap justify-center">
        {favSpells?.map((spell) => (
          <SpellCard
            key={spell.index}
            spell={spell}
            isFavorite={true}
            removeFavState={removeFavState}
            addFavState={addFavState}
          />
        ))}
      </div>
    </main>
  );
};

export default Favorites;
