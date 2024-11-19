import { MovieList } from "../components/MovieList";

function WatchListDetail() {
  return (
    <section className="watchlist-detail">
      <p className="header">Movies by Tom Cruise</p>
      <p>About this watchlist</p>
      <p className="list-description">
        This list lorem ipsum dolor et blah blah blah
      </p>

      <MovieList>
        <div className="list-details flex">
          <DetailBox title="ITEMS ON LIST" metric="10" />
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
