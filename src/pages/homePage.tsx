import { useEffect, useState } from "react";
import { WelcomeSection } from "../components/Main";
import { SearchBar } from "../components/SearchBar";
import { MovieList } from "../components/MovieList";
import { Loader } from "../components/Loader";
import { RenderError } from "../components/Error";
import { movie } from "../components/MovieList";
import { AUTH_BEARER } from "../config";
import { useSearchParams } from "react-router-dom";

// Define the movie interface
interface Movie {
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

interface HomepageProps {
  setQueriedMovies: Function;
  queriedMovies: movie[];
}

// Define the API URL and options
const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_BEARER}`,
  },
};

function HomePage({ setQueriedMovies, queriedMovies }: HomepageProps) {
  const [popularMoviesList, setPopularMoviesList] = useState<movie[]>([]);

  const [searchparams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchparams.get("query") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(JSON.parse(localStorage.getItem("queriedMovies") || "[]"));

  useEffect(() => {
    async function getPopularMoviesList() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(url, options);
        if (!response) {
          throw new Error(
            "There was an error fetching your request... check your internet connection and try again"
          );
        }
        const data = await response.json();

        const editData: movie[] = data.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          score: Math.round(movie.vote_average * 10),
        }));

        console.log(data.results);
        setPopularMoviesList(editData);
      } catch (error: any) {
        console.log("Failed to fetch popular movies:");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getPopularMoviesList();
  }, []);

  return (
    <>
      <WelcomeSection />
      <SearchBar
        setQueriedMovies={setQueriedMovies}
        setLoading={setLoading}
        setError={setError}
        query={query}
        setQuery={setQuery}
        setSearchParams={setSearchParams}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <RenderError message={error} />
      ) : queriedMovies.length === 0 ? (
        <PopularMovies popularMoviesList={popularMoviesList} />
      ) : (
        <SearchResult queriedMovies={queriedMovies} />
      )}
    </>
  );
}
function PopularMovies({ popularMoviesList }: { popularMoviesList: movie[] }) {
  return (
    <MovieList list={popularMoviesList}>
      <div className="title">
        <p>Popular movies right now</p>
      </div>
    </MovieList>
  );
}

function SearchResult({ queriedMovies }: { queriedMovies: movie[] }) {
  return (
    <MovieList list={queriedMovies}>
      <div className="title">
        <p>Showing {queriedMovies.length} results</p>
      </div>
    </MovieList>
  );
}

export default HomePage;
