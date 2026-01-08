import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import {  FormEvent,  useState } from "react";
import { API_URL } from "../utils/config";
import { Loader } from "../components/Loader";
import authFetch from "../utils/authFetch";
import { RenderError } from "../components/Error";
import { useWatchlist } from "../contexts/watchlistsContext";

function CreateWatchList() {
  const [error, setError] = useState("");

  const [watchListName, setWatchlistName] = useState("");
  const [watchListDescription, setWatchlistDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { refetch } = useWatchlist();

  async function createWatchlist(e: FormEvent) {
    e.preventDefault();
    if (!watchListName || !watchListDescription) return;
    try {
      setLoading(true);
      setError("");

      const response = await authFetch(`${API_URL}/watchlists/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: watchListName,
          description: watchListDescription,
        }),
      });

      const data = await response.json();
      setLoading(false);
      console.log(data);
      if (data.status === "success") {
        refetch();
        navigate(`/watchlistdetail/${data.data._id}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          className="create-watchlist flex"
          onSubmit={(e) => {
            createWatchlist(e);
          }}
        >
          <p role="heading" aria-level={1}>
            Create a new Watchlist
          </p>
          {error && <RenderError message={error} />}

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
          <Button>
            <span className="fa fa-plus"></span> Create WatchList
          </Button>
        </form>
      )}
    </>
  );
}

export default CreateWatchList;
