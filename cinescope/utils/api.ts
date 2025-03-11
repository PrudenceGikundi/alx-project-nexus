import { Movie } from "../interfaces";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store API key in .env
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.error("❌ Missing TMDB API Key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env file.");
}

// Utility function to format movie data
const mapMovieData = (movie: any): Movie => ({
  id: movie.id,
  title: movie.title || "Untitled",
  poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/default-poster.png",
  releaseDate: movie.release_date || "Unknown",
  overview: movie.overview || "No overview available.",
  rating: movie.vote_average || 0,
  onFavoriteToggle: () => {}, // Provide a default function
});

export default mapMovieData;

// Fetch trending movies
export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results?.map(mapMovieData) || [];
  } catch (error) {
    console.error("❌ Error fetching trending movies:", error);
    return [];
  }
};

//  Fetch recommended (popular) movies
export const fetchRecommendedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results?.map(mapMovieData) || [];
  } catch (error) {
    console.error("❌ Error fetching recommended movies:", error);
    return [];
  }
};

//  Fetch upcoming movies
export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results?.map(mapMovieData) || [];
  } catch (error) {
    console.error("❌ Error fetching upcoming movies:", error);
    return [];
  }
};

//  Fetch top-rated movies
export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results?.map(mapMovieData) || [];
  } catch (error) {
    console.error("❌ Error fetching top-rated movies:", error);
    return [];
  }
};

//  Fetch movies by search query (Unlimited results)
export const fetchMoviesBySearch = async (query: string): Promise<Movie[]> => {
  try {
    if (!query.trim()) return [];
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results?.map(mapMovieData) || [];
  } catch (error) {
    console.error("❌ Error searching movies:", error);
    return [];
  }
};
