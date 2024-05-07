import openDatabase from "./openDatabase";
import { Spell } from "../types";

const toggleFavoriteSpell = (
  spell: Spell,
  isFavorite: boolean,
  removeFavState: (spell: Spell) => void,
  addFavState: (spell: Spell) => void,
  isDoubleClick: boolean
) => {
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

export default toggleFavoriteSpell;
