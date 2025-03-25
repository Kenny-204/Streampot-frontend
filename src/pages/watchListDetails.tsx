import { Link, useParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { minutesToHours } from "./movieDetail";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { tempMovieData } from "../components/Main";
import { Loader } from "../components/Loader";

interface CurrentWatchList {
  title: string;
  description: string;
  items: any[]; 
}

interface DetailBoxProps {
  title: string;
  metric: string | number;
}

function WatchListDetail() {
  
  const [currentWatchlist, setCurrentWatchList] = useState<CurrentWatchList>({
    title: "",
    description: "",
    items: [],
  });
  const [loading, setLoading] = useState(false);
  const { id:currentWatchlistId } = useParams();

  useEffect(
    function () {
      async function getCurrentWatchList() {
        try {
          setLoading(true);
          const response = await fetch(
            `${API_URL}/watchlist/${currentWatchlistId}`
          );
          const data = await response.json();
          const newWatchlList = {
            title: data.name,
            description: data.description,
            items: tempMovieData,
          };
          console.log(data);
          console.log(newWatchlList);
          setCurrentWatchList(newWatchlList);
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
      getCurrentWatchList();
    },
    [currentWatchlistId]
  );

  console.log(currentWatchlist);
  console.log(loading);
  const totalRuntime = currentWatchlist.items
    ?.map((movie) => movie.runtime)
    .reduce((a, b) => a + b, 0);

  const hours = minutesToHours(totalRuntime);
  const totalMovies = currentWatchlist.items?.length;
  const totalScore = currentWatchlist.items?.reduce((prev, watchListItem) => {
    return watchListItem?.score + prev;
  }, 0);
  const averageScore = Math.trunc(totalScore / totalMovies);

  return (
 
    loading ? (
      <Loader />
    ) : (
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
           
          >
            <div className="list-details flex">
              <DetailBox title="ITEMS ON LIST" metric={totalMovies || 0} />
              <DetailBox title="UNWATCHED RUNTIME" metric={hours} />
              <DetailBox title="AVERAGE SCORE" metric={averageScore} />
            </div>
          </MovieList>
        )}
      </section>
    )
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
