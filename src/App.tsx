import { useState } from "react";
import { useQuery } from "react-query";
import { SpellCard } from "./components";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
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

  const { data, isSuccess } = useQuery(
    ["spells", currentPage],
    () => fetchSpells(currentPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main>
      <h1 className="text-center text-bold text-2xl p-2">DND Spells</h1>

      <div className="flex flex-col gap-8 p-6">
        {isSuccess &&
          data.map((spell) => <SpellCard key={spell.index} spell={spell} />)}
      </div>
      {isSuccess && (
        <div className="flex gap-2">
          {[...Array(Math.ceil(totalSpells / itemsPerPage))].map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default App;
