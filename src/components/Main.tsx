import { ReactNode } from "react";
import { BookMarkIcon, CheckIcon } from "./Icons";

export const tempMovieData = [
  {
    id: "tt13795666",
    title: "Top Gun: Maverick",
    year: "2022",
    poster: "movie1.webp",
    description:'hallo',
    score: 30,
    runtime:90
    
  },
  {
    id: "tt013s3093",
    title: "Fantastic Beasts: The secrets of Dumbledore",
    year: "2022",
    poster: "movie2.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt13756s66",
    title: "Top Gun: Maverick",
    year: "2022",
    poster: "movie1.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt0133s0093",
    title: "Fantastic Beasts: The secrets of Dumbledore",
    year: "2022",
    poster: "movie2.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt67l5166a8",
    title: "Parasite",
    year: "2019",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    score: 30,
    runtime:90
  },
  {
    id: "tt013n30093",
    title: "Fantastic Beasts: The secrets of Dumbledore",
    year: "2022",
    poster: "movie2.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt6751m668",
    title: "Parasite",
    year: "2019",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    score: 30,
    runtime:90
  },
  {
    id: "tt01330p093",
    title: "Fantastic Beasts: The secrets of Dumbledore",
    year: "2022",
    poster: "movie2.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt675166b8",
    title: "Parasite",
    year: "2019",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    score: 30,
    runtime:90
  },
  {
    id: "tt0133009v3",
    title: "Fantastic Beasts: The secrets of Dumbledore",
    year: "2022",
    poster: "movie2.webp",
    score: 30,
    runtime:90
  },
  {
    id: "tt67516g68",
    title: "Parasite",
    year: "2019",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    score: 30,
    runtime:90
  },
];

interface Main {
  children: ReactNode;
  onClick:Function;
}

function Main({ children,onClick }: Main) {
  return <main className="main" onClick={()=>onClick()} >{children}</main>;
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
