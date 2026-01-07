import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { API_URL } from "../utils/config";
import { Loader } from "../components/Loader";
import authFetch from "../utils/authFetch";

function CreateWatchList({
  setRefetch,
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>;
}) {
  // { setCurrentWatchListId }:{setCurrentWatchListId:Function}
  const [watchListName, setWatchlistName] = useState("");
  const [watchListDescription, setWatchlistDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const { currentUser } = useAuth();

  async function createWatchlist(e: FormEvent) {
    e.preventDefault();
    if (!watchListName || !watchListDescription) return;
    try {
      setLoading(true);
      const response = await authFetch(`${API_URL}/watchlists/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: watchListName,
          description: watchListDescription,
        }),
      });
      //  fetch(`${API_URL}/watchlists/`, {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({
      //     name: watchListName,
      //     description: watchListDescription,
      //     userId: "user001",
      //   }),
      // });
      const data = await response.json();
      setLoading(false);
      console.log(data);
      // setCurrentWatchListId(data.id);
      if (data.status === "success") {
        setRefetch((refetch) => !refetch);
        navigate(`/watchlistdetail/${data.data._id}`);
      }
    } catch (error: any) {
      console.log(error.message);
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
