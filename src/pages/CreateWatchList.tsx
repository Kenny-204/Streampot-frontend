import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FormEvent } from "react";

interface CreateWatchList {
  watchListName: string;
  watchListDescription: string;
  setWatchlistDescription: Function;
  setWatchlistName: Function;
  onCreateWatchList: Function;
  onSetCurrentWatchList: Function;
}

function CreateWatchList({
  watchListName,
  watchListDescription,
  setWatchlistDescription,
  setWatchlistName,
  onCreateWatchList,
  onSetCurrentWatchList,
}: CreateWatchList) {
  const navigate = useNavigate();

  function onButtonClick(e) {
    e.preventDefault();
    onCreateWatchList();
    navigate("/watchlistdetail");
  }
  return (
    <>
      <form className="create-watchlist flex">
        <p role="heading" aria-level={1}>
          Create a new Watchlist
        </p>
        <label htmlFor="watchlist-title"> Name</label>
        <input
          type="text"
          name="watchlist-title"
          onChange={(e) => setWatchlistName(e.target.value)}
          value={watchListName}
        />
        <label htmlFor="watchlist-description"> Description</label>
        <input
          type="text"
          name="watchlist-description"
          className="description"
          onChange={(e) => setWatchlistDescription(e.target.value)}
          value={watchListDescription}
        />
        <Button
          onClick={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onCreateWatchList();
            onSetCurrentWatchList();
            navigate("/watchlistdetail");
          }}
        >
          <span className="fa fa-plus"></span> Create WatchList
        </Button>
      </form>
    </>
  );
}

export default CreateWatchList;
