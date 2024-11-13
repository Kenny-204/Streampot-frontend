const tempMovieData = [
  {
    imdbID: "tt13795666",
    Title: "Top Gun: Maverick",
    Year: "2022",
    Poster: "movie1.webp",
  },
  {
    imdbID: "tt0133093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt1375666",
    Title: "Top Gun: Maverick",
    Year: "2022",
    Poster: "movie1.webp",
  },
  {
    imdbID: "tt01330093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

function Main({children}) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

export function WelcomeSection() {
  return (
    <div className="welcome">
      <p className="title" role="heading" aria-level={1}>
        Welcome to <span>Capstone</span>
      </p>
      <p className="welcome-text">
        Browse movies, add them to watchlists and share them with friends.
      </p>
      <p className="welcome-text">
        Just click the <span className="fa fa-bookmark"></span> to add a movie,
        the poster to see more details or <span className="fa fa-check"></span>{" "}
        to mark the movie as watched.
      </p>
    </div>
  );
}

export function SearchBar() {
  return (
    <div className="searchbar">
      <span className="fa fa-search"></span>
      <input type="text" placeholder="Search for movie by title " />
      <button>Search</button>
    </div>
  );
}

export function MovieList() {
  return (
    <div className="movie-list">
      <div className="title">
        <p>Popular movies right now</p>
      </div>
      <ul className="flex movies">
        {tempMovieData.map((movie) => (
          <Movie title={movie.Title} year={movie.Year} image={movie.Poster} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
}

function Movie({ title, year, image }) {
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

export default Main;
