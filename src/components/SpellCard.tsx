import { Spell } from "../types";
import openDatabase from "../db/openDatabase";

const SpellCard = ({
  spell,
  isFavorite,
  removeFavState,
  addFavState,
}: {
  spell: Spell;
  isFavorite: boolean;
  removeFavState: (spell: Spell) => void;
  addFavState: (spell: Spell) => void;
}) => {
  const handleFavorite = (isDoubleClick: boolean) => {
    const openRequest = openDatabase();
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction("fav_spells", "readwrite");
      const objectStore = transaction.objectStore("fav_spells");
      let request: IDBRequest;
      if (isFavorite && !isDoubleClick) {
        request = objectStore.delete(spell.index);
      } else {
        request = objectStore.add(spell);
      }

      request.onsuccess = () => {
        if (isFavorite && !isDoubleClick) {
          removeFavState(spell);
        } else {
          addFavState(spell);
        }
      };
      request.onerror = (event) => {
        // ConstraintError occurs when an object with the same id already exists
        if (request?.error?.name == "ConstraintError") {
          console.log("Spell with such index already exists");
          event.preventDefault(); // don't abort the transaction
        } else {
          console.log("error", event);
        }
      };
    };
  };
  return (
    <div
      onDoubleClick={() => handleFavorite(true)}
      className="relative flex flex-col border-4 border-primary p-4 w-full lg:w-5/12 rounded-sm cursor-pointer"
    >
      <button
        onClick={() => handleFavorite(false)}
        className="absolute right-6 lg:text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <h2 className="font-heading">{spell.name}</h2>
      <p className="font-subheading text-primary font-semibold text-xl lg:text-2xl tracking-tight">
        {spell.level > 0 && `Level ${spell.level} `}
        {spell.school.name}
        {spell.level === 0 && " cantrip"}
      </p>
      <div className="flex gap-4 py-2 text-primary lg:text-xl border-y-2 border-primary">
        <div className="spellStat">
          <span className="text-stone-800">casting time</span>
          <span>{spell.casting_time}</span>
        </div>
        <div className="spellStat">
          <span className="text-stone-800">range</span>
          <span>{spell.range}</span>
        </div>
        <div className="spellStat">
          <span className="text-stone-800">duration</span>
          <span>{spell.duration.toLowerCase()}</span>
        </div>
        <div className="spellStat">
          <span className="text-stone-800">components</span>
          <span>{spell.components.join(", ")}</span>
        </div>
      </div>
      <p className="text-justify py-2">{spell.desc[0]}</p>
      <hr className="mt-auto border border-primary" />
      <p className="italic self-end pt-2 font-light">
        {spell.classes.map((cls) => cls.name).join(", ")}
      </p>
    </div>
  );
};

export default SpellCard;
