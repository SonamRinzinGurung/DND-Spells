import { Spell } from "../types";

const SpellCard = ({ spell }: { spell: Spell }) => {
  return (
    <div className="border p-2">
      <h2>{spell.name}</h2>
      <p>
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
