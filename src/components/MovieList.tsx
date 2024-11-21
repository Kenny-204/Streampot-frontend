import { ReactNode } from "react";
import { BookMarkIcon } from "./Icons";
import { tempMovieData } from "./Main";

interface movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  
}

interface movieList {
  children: ReactNode;
  list?: movie[];
}

export function MovieList({ children, list=tempMovieData  }:movieList) {
  return (
    <div className="movie-list">
      {children}
      <ul className="flex movies">
        {list.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
          />
        ))}
      </ul>
    </div>
  );
}
function Movie({  movie }:any) {
  return (
    <li className="flex movie">
      <BookMarkIcon onClick={() => console.log(movie)} />
      <img src={movie.Poster} alt={movie.Title} width="150px" height="225px" />
      <div className="movie-details">
        <p className="movie-rating">83/100</p>
        <p className="movie-title">
          {movie.Title} ({movie.Year})
        </p>
      </div>
    </li>
  );
}
