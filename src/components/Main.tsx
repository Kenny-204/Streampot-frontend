import { ReactNode } from "react";
import { BookMarkIcon, CheckIcon } from "./Icons";

export const tempMovieData = [
  {
    imdbID: "tt13795666",
    Title: "Top Gun: Maverick",
    Year: "2022",
    Poster: "movie1.webp",
  },
  {
    imdbID: "tt013s3093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt13756s66",
    Title: "Top Gun: Maverick",
    Year: "2022",
    Poster: "movie1.webp",
  },
  {
    imdbID: "tt0133s0093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt67l5166a8",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt013n30093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt6751m668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt01330p093",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt675166b8",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133009v3",
    Title: "Fantastic Beasts: The secrets of Dumbledore",
    Year: "2022",
    Poster: "movie2.webp",
  },
  {
    imdbID: "tt67516g68",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

interface Main {
  children: ReactNode;
}

function Main({ children }: Main) {
  return <main className="main">{children}</main>;
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
        Just click the <BookMarkIcon /> to add a movie, the poster to see more
        details or <CheckIcon /> to mark the movie as watched.
      </p>
    </div>
  );
}

export default Main;
