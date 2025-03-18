import { AUTH_BEARER } from "../config";
import { movie } from "./MovieList";
import { useEffect } from "react";

// Define the movie interface
interface Movie {
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

interface searchbar {
  setQueriedMovies: Function;
  setLoading: Function;
  setError: Function;
  query: string;
  setQuery: Function;
  setSearchParams: Function;
}

export function SearchBar({
  query,
  setQuery,
  setQueriedMovies,
  setLoading,
  setError,
  setSearchParams,
}: searchbar) {
  useEffect(function () {
    if (query) {
      handleSearchMovie(query);
    }
  }, []);
  async function handleSearchMovie(query: string) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_BEARER}`,
        },
      };
      setLoading(true);
      setError("");
      const response = await fetch(url, options);
      console.log(response);
      if (!response.ok) {
        throw new Error(
          "There was an error fetching your request... check your internet connection and try again"
        );
      }
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("Couldnt find your movie");
      }

      // Map and transform the data to match PopularMovie interface
      const editData: movie[] = data.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        score: Math.round(movie.vote_average * 10),
      }));
      // localStorage.setItem('queriedMovies',JSON.stringify(editData))
      setQueriedMovies(editData);
      console.log(editData);
    } catch (e: any) {
      console.error(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="searchbar">
      <span className="fa fa-search"></span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchMovie(query);
          setQuery("");
        }}
      >
        <input
          type="text"
          placeholder="Search for movie by title "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchParams({ query: e.target.value });
          }}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
