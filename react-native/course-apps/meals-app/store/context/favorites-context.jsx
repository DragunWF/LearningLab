import { createContext, useState } from "react";

const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState();

  function addFavorite(id) {
    setFavoriteMealIds((current) => [...current, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((current) => current.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  <FavoritesContext.Provider value={value}>
    {children}
  </FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
