import { Link } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { minutesToHours } from "./movieDetail";

interface CurrentWatchList {
  title: string;
  description: string;
  items: any[]; // Changed from never[] to allow any type of items
}

interface DetailBoxProps {
  title: string;
  metric: string | number;
}

function WatchListDetail({
  currentWatchlist,
  setCurrentMovie,
}: {
  currentWatchlist: CurrentWatchList;
  setCurrentMovie: Function;
}) {
  const totalRuntime = currentWatchlist.items
    .map((movie) => movie.runtime)
    .reduce((a, b) => a + b, 0);

    const hours =  minutesToHours(totalRuntime)
  const totalMovies = currentWatchlist.items?.length;
  const totalScore = currentWatchlist.items.reduce((prev, watchListItem) => {
    return watchListItem?.score + prev;
  }, 0);
  const averageScore = Math.trunc(totalScore / totalMovies);

  return (
    <section className="watchlist-detail">
      <p className="header">{currentWatchlist.title}</p>
      <p>About this watchlist</p>
      <p className="list-description">{currentWatchlist.description}</p>

      {totalMovies === 0 ? (
        <p>
          You currently do not have any movies here... go and add some{" "}
          <Link to="/">Here</Link>{" "}
        </p>
      ) : (
        <MovieList
          list={currentWatchlist.items}
          setCurrentMovie={setCurrentMovie}
        >
          <div className="list-details flex">
            <DetailBox title="ITEMS ON LIST" metric={totalMovies || 0} />
            <DetailBox title="UNWATCHED RUNTIME" metric={hours} />
            <DetailBox title="AVERAGE SCORE" metric={averageScore} />
          </div>
        </MovieList>
      )}
    </section>
  );
}

export function DetailBox({ title, metric }: DetailBoxProps) {
  return (
    <div className="detail-box flex">
      <p>{title}</p>
      <p className="metric">{metric}</p>
    </div>
  );
}

export default WatchListDetail;
