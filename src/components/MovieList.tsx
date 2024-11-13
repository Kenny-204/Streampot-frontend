import { tempMovieData } from "./Main";


export function MovieList({children}) {
  return (
    <div className="movie-list">
     {children}
      <ul className="flex movies">
        {tempMovieData.map((movie) => (
          <Movie title={movie.Title} year={movie.Year} image={movie.Poster} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
}
function Movie({ title = '', year = '', image = '' }) {
  return (
    <li className="flex movie">
      <span className="fa fa-bookmark"></span>
      <img src={image} alt={title} width="150px" height="225px" />
      <div className="movie-details">
        <p className="movie-rating">83/100</p>
        <p className="movie-title">
          {title} ({year})
        </p>
      </div>
    </li>
  );
}
