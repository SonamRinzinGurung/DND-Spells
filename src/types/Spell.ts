type Spell = {
  index: string;
  name: string;
  range: string;
  duration: string;
  casting_time: string;
  level: number;
  components: string[];
  school: {
    name: string;
  };
  desc: string[];
  classes: [
    {
      name: string;
    }
  ];
};

export default Spell;
