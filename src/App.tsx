import { useQuery } from "react-query";

const App = () => {
  const BASE_URL = "https://www.dnd5eapi.co";

  const fetchSpells = async () => {
    const data = await fetch(BASE_URL + "/api/spells");
    const spellsData = await data.json();

    return await Promise.all(
      spellsData.results.map(async (spell: { url: string }) => {
        const response = await fetch(BASE_URL + spell.url);
        return await response.json();
      })
    );
  };

  const { data, isSuccess, isFetching } = useQuery(
    ["spells"],
    () => fetchSpells(),
    {
      keepPreviousData: true,
    }
  );

  return (
    <main>
      <h1 className="text-center text-bold text-2xl p-2">DND Spells</h1>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-8 p-6">
          {isSuccess &&
            data.map((s, index) => (
              <div className="border p-2" key={index}>
                <h2>{s.name}</h2>
                <p>range {s.range}</p>
                <p>duration {s.duration}</p>
              </div>
            ))}
        </div>
      )}
    </main>
  );
};

export default App;
