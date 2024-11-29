import { useEffect, useState } from "react";
import { WelcomeSection } from "../components/Main";
import { SearchBar } from "../components/SearchBar";
import { MovieList } from "../components/MovieList";
import { Loader } from "../components/Loader";
import { RenderError } from "../components/Error";
import { movie } from "../components/MovieList";

// Define the movie interface
interface Movie {
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}


// Define the API URL and options
const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA0ODNiMjRkYjY1NjM0MDdlZDNmZGM2YTc5NzJlZiIsIm5iZiI6MTczMTk5ODAzNS4wMzcwMTEsInN1YiI6IjY3M2I4NzYzYTA5MWMwMGExNWE2ZmM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5m-QqxGUuZUFIuKb0TQhY-O86izJZ-ZVmwBsVkTNTs4",
  },
};

function HomePage({
  setCurrentMovie,
}: {
  setCurrentMovie:Function;
}) {
  const [popularMoviesList, setPopularMoviesList] = useState<movie[]>(
    []
  );
  const [query, setQuery] = useState<string>("");
  const [queriedMovies, setQueriedMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

        console.log(editData);
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
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <RenderError message={error} />
      ) : queriedMovies.length === 0 ? (
        <PopularMovies
          popularMoviesList={popularMoviesList}
          setCurrentMovie={setCurrentMovie}
        />
      ) : (
        <SearchResult
          queriedMovies={queriedMovies}
          setCurrentMovie={setCurrentMovie}
        />
      )}
    </>
  );
}
function PopularMovies({
  popularMoviesList,
  setCurrentMovie,
}: {
  popularMoviesList: movie[];
  setCurrentMovie: Function;
}) {
  return (
    <MovieList list={popularMoviesList} setCurrentMovie={setCurrentMovie}>
      <div className="title">
        <p>Popular movies right now</p>
      </div>
    </MovieList>
  );
}

function SearchResult({
  queriedMovies,
  setCurrentMovie,
}: {
  queriedMovies: movie[];
  setCurrentMovie: Function;
}) {
  return (
    <MovieList list={queriedMovies} setCurrentMovie={setCurrentMovie}>
      <div className="title">
        <p>Showing {queriedMovies.length} results</p>
      </div>
    </MovieList>
  );
}

export default HomePage;
