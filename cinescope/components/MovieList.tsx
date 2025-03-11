// import React from "react";
// import MovieCard from "./MovieCard";
// import { Movie } from "@/interfaces";

// interface MovieListProps {
//   movies: Movie[];
// }

// const MovieList: React.FC<MovieListProps> = ({ movies }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {movies.map((movie) => (
//         <MovieCard key={movie.id} movie={movie} />
//       ))}
//     </div>
//   );
// };

// export default MovieList;


import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/interfaces";

interface MovieListProps {
  movies: Movie[];
  updateFavorites: (movie: Movie) => void; // Accept updateFavorites as a prop
}

const MovieList: React.FC<MovieListProps> = ({ movies, updateFavorites }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          updateFavorites={updateFavorites} // Pass updateFavorites to MovieCard
        />
      ))}
    </div>
  );
};

export default MovieList;
