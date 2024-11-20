import { MovieList } from "../components/MovieList";

function WatchListDetail({currentWatchlist}) {
  return (
    <section className="watchlist-detail">
      <p className="header">{currentWatchlist.title}</p>
      <p>About this watchlist</p>
      <p className="list-description">
        {currentWatchlist.description}
      </p>

      <MovieList>
        <div className="list-details flex">
          <DetailBox title="ITEMS ON LIST" metric={currentWatchlist.items?.length || 0} />
          <DetailBox title="UNWATCHED RUNTIME" metric="14h 30m" />
          <DetailBox title="AVERAGE SCORE" metric="73" />
        </div>
      </MovieList>
    </section>
  );
}

interface DetailBox {
  title: string;
  metric: string;
}

function DetailBox({ title, metric }: DetailBox) {
  return (
    <div className="detail-box flex">
      <p>{title}</p>
      <p className="metric">{metric}</p>
    </div>
  );
}

export default WatchListDetail;
