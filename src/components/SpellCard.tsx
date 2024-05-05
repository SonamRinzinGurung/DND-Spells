import { Spell } from "../types";

const SpellCard = ({ spell }: { spell: Spell }) => {
  return (
    <div className="p-2 border-primary border-4">
      <h2 className="text-primary font-heading">{spell.name}</h2>
      <p className="font-subheading">
        {spell.level > 0 && `Level ${spell.level} `}
        {spell.school.name}
        {spell.level === 0 && " cantrip"}
      </p>
      <p>casting time {spell.casting_time}</p>
      <p>range {spell.range}</p>
      <p>duration {spell.duration}</p>
      <p>components {spell.components.join(", ")}</p>
      <p>{spell.desc[0]}</p>
      <p>classes: {spell.classes.map((cls) => cls.name).join(", ")}</p>
    </div>
  );
};

export default SpellCard;
