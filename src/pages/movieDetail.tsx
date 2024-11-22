import { Button } from "../components/Button";
import { DetailBox } from "./watchListDetails";

interface MovieDetailProps {
  currentMovie: {
    image: string;
    name: string;
    year: string;
    description: string;
    score: number;
  };
}

export default function MovieDetail({ currentMovie }: MovieDetailProps) {
  return (
    <>
      <div className="movie-details-container flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${currentMovie.image}`}
          alt="movie"
          width="250px"
          height="350px"
        />

        <div className="movie-details flex">
          <div>
            <h2>
              {currentMovie.name} ({currentMovie.year.slice(0, 4)})
            </h2>
            <p>Action, Drama . 2h 11m</p>
          </div>
          <div className="overview">
            <h4 className="overview-title">Overview</h4>
            <p>{currentMovie.description}</p>
          </div>
          <div className="flex buttons ">
            <DetailBox title="Score" metric={currentMovie.score} />
            <Button className="movie-details-button">Add to watchlist</Button>
          </div>
        </div>
      </div>
    </>
  );
}