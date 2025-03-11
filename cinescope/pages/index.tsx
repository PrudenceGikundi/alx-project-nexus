import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
import debounce from "lodash.debounce"; // Debounce for optimized search requests
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Movie } from "@/interfaces";
import { fetchTrendingMovies, fetchMoviesBySearch } from "@/utils/api";

// Lazy Load MovieCard for better performance
const MovieCard = lazy(() => import("@/components/MovieCard"));

const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]); // Trending movies state
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch trending movies on mount
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  // Debounced search function
  const fetchMoviesDebouncedRef = useRef(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const results = await fetchMoviesBySearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  useEffect(() => {
    fetchMoviesDebouncedRef.current(searchQuery);
  }, [searchQuery]);

  // Function to update favorites
  const updateFavorites = (movie: Movie) => {
    console.log("Movie added to favorites:", movie);
    // Implement logic for updating favorites
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-600 to-pink-500 dark:from-gray-900 dark:to-gray-800 text-white transition-all">
      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Display Search Results or Default Movies */}
        {searchQuery ? (
          <section>
            <h2 className="text-3xl font-bold text-gold-400 mb-4">
              Search Results for &quot;{searchQuery}&quot;
            </h2>
            {loading ? (
              <p className="text-lg text-gray-300">Loading...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-lg text-gray-300">No movies found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Suspense fallback={<p>Loading movies...</p>}>
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      updateFavorites={updateFavorites} // Pass updateFavorites to MovieCard
                    />
                  ))}
                </Suspense>
              </div>
            )}
          </section>
        ) : (
          <section>
            <h2 className="text-3xl font-bold text-gold-400 mb-4">Trending Now</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-gray-700 h-64 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <Suspense fallback={<p>Loading...</p>}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {trendingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      updateFavorites={updateFavorites} // Pass updateFavorites to MovieCard
                    />
                  ))}
                </div>
              </Suspense>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
