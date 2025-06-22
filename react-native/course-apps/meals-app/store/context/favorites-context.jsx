import { createContext } from "react";

const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  <FavoritesContext.Provider>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
