import { ReactNode } from "react";
import { BookMarkIcon } from "./Icons";

import { useNavigate } from "react-router-dom";
// import { movie } from "../../types";

interface movieList {
  children: ReactNode;
  list: movie[];
}

export interface movie {
  id: string;
  title: string;
  year: string;
  runtime?: number;
  poster: string;
  score: number;
}

export function MovieList({ children, list }: movieList) {
  return (
    <div className="movie-list">
      {children}
      <ul className="movies">
        {list.map((movie, i) => (
          <Movie movie={movie} key={i} />
        ))}
      </ul>
      <div>
        <button>Next</button>
        <span>...</span>
        <button>Previous</button>
      </div>
    </div>
  );
}

function Movie({ movie }: { movie: movie }) {
  const navigate = useNavigate();

  function handleSetCurrentMovie() {
    navigate(`/moviedetail/${movie.id}`);
  }
  return (
    <li className="flex movie" onClick={handleSetCurrentMovie}>
      <BookMarkIcon />
      <img src={movie.poster} alt={movie.title} width="100%" height="225px" />
      <div className="movie-card-info">
        <p className="movie-card-title">{movie.title}</p>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.year}</span>
          <span className="movie-card-score">{movie.score}/100</span>
        </div>
      </div>
    </li>
  );
}
