import { ReactNode } from "react";
import { BookMarkIcon } from "./Icons";
import { tempMovieData } from "./Main";
import { Link, useNavigate } from "react-router-dom";

interface movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  score:number
}

interface movieList {
  children?: ReactNode;
  list?: movie[];
  setCurrentMovie: Function;
  id?: number;
  title?: string;
  year?: string;
  poster?: string;
  description?: string;
  score?: number;
}



export function MovieList({
  children,
  list = tempMovieData,
  setCurrentMovie,
}: movieList) {

  return (
    <div className="movie-list">
      {children}
      <ul className="flex movies">
        {list.map((movie,i) => (
          <Movie
            movie={movie}
            key={i}
            setCurrentMovie={setCurrentMovie}
          />
        ))}
      </ul>
      <div>
        <button>Next</button><span>...</span>
        <button>Previous</button>
      </div>
    </div>
  );
}

interface MovieProps {
  movie: movie;
  setCurrentMovie: Function;
}

function Movie({ movie, setCurrentMovie }: MovieProps) {
  const navigate = useNavigate();

  function handleSetCurrentMovie() {
    setCurrentMovie(movie.id);
    navigate("/moviedetail");
  }
  return (
    <li className="flex movie" onClick={handleSetCurrentMovie}>
      <BookMarkIcon />
      <img src={movie.poster} alt={movie.title} width="150px" height="225px" />
      <div className="movie-details">
        <p className="movie-rating">{movie.score}/100</p>
        <p className="movie-title">
          {movie.title} ({movie.year})
        </p>
      </div>
    </li>
  );
}
