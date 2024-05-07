import { useEffect, useState } from "react";
import { Spell } from "../types";
import openDatabase from "./openDatabase";

const useHandleFavorites = () => {
  const [favSpells, setFavSpells] = useState<Spell[]>([]);

  useEffect(() => {
    const openRequest = openDatabase();

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction("fav_spells", "readwrite");
      const favSpells = transaction.objectStore("fav_spells");
      const request = favSpells.getAll();
      request.onsuccess = () => {
        setFavSpells(request.result);
      };
      request.onerror = (event) => {
        console.log(event);
      };
    };
  }, []);

  const removeFavState = (spell: Spell) => {
    setFavSpells((prev: Spell[]) =>
      prev.filter((val: Spell) => val.index !== spell.index)
    );
  };
  const addFavState = (spell: Spell) => {
    setFavSpells((prev: Spell[]) => [...prev, spell]);
  };

  return { favSpells, setFavSpells, removeFavState, addFavState };
};

export default useHandleFavorites;
