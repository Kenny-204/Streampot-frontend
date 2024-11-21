import { useEffect, useState } from "react";
import  { WelcomeSection } from "../components/Main";
import { SearchBar } from "../components/SearchBar";
import { MovieList } from "../components/MovieList";


// Define the movie interface
interface Movie {
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

// Define the popularMoviesList interface
interface PopularMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  description: string;
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

function HomePage() {
  // Correct the type of state
  const [popularMoviesList, setPopularMoviesList] = useState<PopularMovie[]>(
    []
  );
  const [queriedMovies, setQueriedMovies] = useState<PopularMovie[]>([]);

  // Fetch and process data inside useEffect
  useEffect(() => {
    async function getPopularMoviesList() {
      try {
        const request = await fetch(url, options);
        const data = await request.json();

        // Map and transform the data to match PopularMovie interface
        const editData: PopularMovie[] = data.results.map((movie: Movie) => ({
          imdbID: movie.id,
          Title: movie.title,
          Year: movie.release_date,
          Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
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
        <PopularMovies popularMoviesList={popularMoviesList} />
      ) : (
        <SearchResult queriedMovies={queriedMovies} />
      )}
    </>
  );
}

function PopularMovies({ popularMoviesList }: { popularMoviesList: PopularMovie[] }) {
  return (
    <MovieList list={popularMoviesList}>
      <div className="title">
        <p>Popular movies right now</p>
      </div>
    </MovieList>
  );
}

function SearchResult({ queriedMovies }: { queriedMovies: PopularMovie[] }) {
  return (
    <MovieList list={queriedMovies}>
      <div className="title">
        <p>Popular movies right now</p>
      </div>
    </MovieList>
  );
}

export default HomePage;