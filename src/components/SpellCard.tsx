import { useEffect, useRef, useCallback } from "react";
import type { SpellCardProps } from "../types";
import toggleFavoriteSpell from "../db/toggleFavoriteSpell";

const SpellCard = ({
  spell,
  isFavorite,
  removeFavState,
  addFavState,
}: SpellCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = useCallback(
    (isDoubleClick: boolean) => {
      toggleFavoriteSpell(
        spell,
        isFavorite,
        removeFavState,
        addFavState,
        isDoubleClick
      );
    },
    [spell, isFavorite, addFavState, removeFavState]
  );

  useEffect(() => {
    const card = cardRef.current;

    card?.addEventListener("dblclick", () => toggleFavorite(true));
    return () => {
      card?.removeEventListener("dblclick", () => toggleFavorite(true));
    };
  }, [toggleFavorite]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col border-4 border-primary p-4 w-full lg:w-5/12 rounded-sm cursor-pointer"
    >
      <button
        onClick={() => toggleFavorite(false)}
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
      <div className="flex justify-between gap-2 py-2 text-primary lg:text-xl border-y-2 border-primary">
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
