import { movie } from "./MovieList";


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
}

export function SearchBar({
  query,
  setQuery,
  setQueriedMovies,
  setLoading,
  setError,
}: searchbar) {

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
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
