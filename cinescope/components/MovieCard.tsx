import { FC, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/interfaces";
import WatchTrailerButton from "@/components/WatchTrailerButton";
import Image from "next/image";
import { FavoritesContext } from "@/context/FavoritesContext";

interface MovieCardProps {
  movie: Movie;
  updateFavorites: (movie: Movie) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, updateFavorites }) => {
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [favorites, movie.id]);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents unwanted page refresh

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("You need to log in to add favorites!");
      router.push("/login");
      return;
    }

    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    updateFavorites(movie);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={movie.poster || "/default-movie.png"}
        alt={movie.title || "Unknown Movie"}
        width={500}
        height={750}
        className="w-full h-64 object-cover"
        loading="lazy"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col justify-center items-center text-white">
          <h2 className="text-lg font-bold">{movie.title || "Untitled Movie"}</h2>
          <p className="text-sm">{movie.releaseDate || "Release date unknown"}</p>
          <div className="flex gap-2 mt-2">
            <button
              className={`px-3 py-1 rounded ${isFavorite ? "bg-red-500" : "bg-green-500"} text-white`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <WatchTrailerButton movieId={movie.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;