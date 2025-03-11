export interface Movie {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  overview: string;
  rating: number;
  trailerUrl?: string;
  onFavoriteToggle: () => void;
}

export interface FavoritesContextProps {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
}

export interface MovieCardProps {
  movie: Movie;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: Movie[];
}

export interface Theme {
  mode: "light" | "dark";
}

export interface FavoritesContextTypeProp {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
}
