import { createContext, useState, useEffect, ReactNode } from "react";
import { Movie, FavoritesContextTypeProp } from "@/interfaces";

export const FavoritesContext = createContext<FavoritesContextTypeProp>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.email) {
        setUserEmail(user.email);
        fetchFavorites(user.email);
      }
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, userEmail]);

  const fetchFavorites = async (email: string) => {
    try {
      const res = await fetch(`https://cinewhisper.up.railway.app/favourites/${email}`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId: number) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

