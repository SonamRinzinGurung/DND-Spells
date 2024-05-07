const openDatabase = () => {
  const openRequest = indexedDB.open("spells");

  openRequest.onerror = (event) => {
    console.log("error: ", event);
  };

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;

    // Close the database if there is a version change
    db.onversionchange = function () {
      db.close();
      alert("Database is outdated, please reload the page.");
    };

    // Create an object store named fav_spells if it doesn't exist
    if (!db.objectStoreNames.contains("fav_spells")) {
      db.createObjectStore("fav_spells", { keyPath: "index" });
    }
  };

  return openRequest;
};

export default openDatabase;
