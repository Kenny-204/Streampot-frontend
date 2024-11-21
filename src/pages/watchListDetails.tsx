
import { Link } from "react-router-dom";
import { MovieList } from "../components/MovieList";

interface CurrentWatchList {
  title: string;
  description: string;
  items: any[]; // Changed from never[] to allow any type of items
}

interface DetailBoxProps {
  title: string;
  metric: string | number;
}

function WatchListDetail({ currentWatchlist }: { currentWatchlist: CurrentWatchList }) {
  return (
    <section className="watchlist-detail">
      <p className="header">{currentWatchlist.title}</p>
      <p>About this watchlist</p>
      <p className="list-description">{currentWatchlist.description}</p>

      {currentWatchlist.items?.length === 0 ? (
        <p>You currently do not have any movies here... go and add some <Link to='/'>Here</Link> </p>
      ) : (
        <MovieList list={currentWatchlist.items}>
          <div className="list-details flex">
            <DetailBox
              title="ITEMS ON LIST"
              metric={currentWatchlist.items?.length || 0}
            />
            <DetailBox title="UNWATCHED RUNTIME" metric="14h 30m" />
            <DetailBox title="AVERAGE SCORE" metric="73" />
          </div>
        </MovieList>
      )}
    </section>
  );
}

function DetailBox({ title, metric }: DetailBoxProps) {
  return (
    <div className="detail-box flex">
      <p>{title}</p>
      <p className="metric">{metric}</p>
    </div>
  );
}

export default WatchListDetail;