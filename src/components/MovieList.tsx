import { ReactNode } from "react";
import { BookMarkIcon } from "./Icons";
import { tempMovieData } from "./Main";
import { useNavigate } from "react-router-dom";

interface movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  score:number
}

interface movieList {
  children?: ReactNode;
  list?: movie[];
  setCurrentMovie?: Function;
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
        {list.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            setCurrentMovie={setCurrentMovie}
          />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie, setCurrentMovie }: any) {
  const navigate = useNavigate();

  function handleSetCurrentMovie() {
    const newMovie = {
      name: movie.Title,
      image: movie.Poster,
      year: movie.Year,
      description:movie.description,
      score: Math.round(movie.score)
    };
    
 
    setCurrentMovie(newMovie);
    navigate("/moviedetail");
  }
  return (
    <li className="flex movie" onClick={handleSetCurrentMovie}>
      <BookMarkIcon />
      <img src={movie.Poster} alt={movie.Title} width="150px" height="225px" />
      <div className="movie-details">
        <p className="movie-rating">{movie.score}/100</p>
        <p className="movie-title">
          {movie.Title} ({movie.Year})
        </p>
      </div>
    </li>
  );
}
