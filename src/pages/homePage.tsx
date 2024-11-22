import { useEffect, useState } from "react";
import { WelcomeSection } from "../components/Main";
import { SearchBar } from "../components/SearchBar";
import { MovieList } from "../components/MovieList";

// Define the movie interface
interface Movie {
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

// Define the popularMoviesList interface
interface PopularMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  description: string;
  score: number; // Added missing score property
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

function HomePage({ setCurrentMovie }: { setCurrentMovie: (movie: PopularMovie) => void }) {
  const [popularMoviesList, setPopularMoviesList] = useState<PopularMovie[]>([]);
  const [queriedMovies, setQueriedMovies] = useState<PopularMovie[]>([]);

  useEffect(() => {
    async function getPopularMoviesList() {
      try {
        const request = await fetch(url, options);
        const data = await request.json();

        const editData: PopularMovie[] = data.results.map((movie: Movie) => ({
          imdbID: movie.id,
          Title: movie.title,
          Year: movie.release_date,
          Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          score: Math.round(movie.vote_average * 10)
        }));

        console.log(editData);
        setPopularMoviesList(editData);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    }
    getPopularMoviesList();
  }, []);

  return (
    <>
      <WelcomeSection />
      <SearchBar setQueriedMovies={setQueriedMovies} />
      {queriedMovies.length === 0 ? (
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
  popularMoviesList: PopularMovie[];
  setCurrentMovie: (movie: PopularMovie) => void;
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
  queriedMovies: PopularMovie[];
  setCurrentMovie: (movie: PopularMovie) => void;
}) {
  return (
    <MovieList list={queriedMovies} setCurrentMovie={setCurrentMovie}>
      <div className="title">
        <p>You searched for:</p>
        <p>Showing {queriedMovies.length} results</p>
      </div>
    </MovieList>
  );
}

export default HomePage;