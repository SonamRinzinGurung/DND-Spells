import { Spell } from ".";

type SpellCardProps = {
  spell: Spell;
  isFavorite: boolean;
  removeFavState: (spell: Spell) => void;
  addFavState: (spell: Spell) => void;
};

export default SpellCardProps;
