import { useState } from "react";

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

interface searchbar{
  setQueriedMovies:Function
}

export function SearchBar({ setQueriedMovies }:searchbar) {
  const [query, setQuery] = useState<string>("");

  async function handleSearchMovie(query: string) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA0ODNiMjRkYjY1NjM0MDdlZDNmZGM2YTc5NzJlZiIsIm5iZiI6MTczMTk5ODAzNS4wMzcwMTEsInN1YiI6IjY3M2I4NzYzYTA5MWMwMGExNWE2ZmM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5m-QqxGUuZUFIuKb0TQhY-O86izJZ-ZVmwBsVkTNTs4",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      // Map and transform the data to match PopularMovie interface
      const editData: PopularMovie[] = data.results.map((movie: Movie) => ({
        imdbID: movie.id,
        Title: movie.title,
        Year: movie.release_date,
        Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
      }));
      console.log(data.results);
      setQueriedMovies(editData);
    } catch (e: any) {
      console.error(e.message);
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
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
