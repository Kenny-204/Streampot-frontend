import { MovieList } from "../components/MovieList";
import { SearchBar } from "../components/SearchBar";

function SearchResult() {
  return (
    <MovieList>
      <div className="title">
        <p>Popular movies right now</p>
      </div>
      <SearchBar />
    </MovieList>
  );
}

export default SearchResult;
