export const tempMovieData = [
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
        Welcome to <span>Streampot</span>
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

export default Main;
