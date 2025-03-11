import { useContext } from "react";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FavoritesContext } from "@/context/FavoritesContext";
import { Movie } from "@/interfaces";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const updateFavorites = (movie: Movie) => {
    removeFavorite(movie.id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} updateFavorites={updateFavorites} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;