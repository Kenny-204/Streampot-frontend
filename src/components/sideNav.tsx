import { Button } from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { HouseIcon, HistoryIcon, PlusIcon, Ellipsis } from "./Icons";
import { useAuth } from "../contexts/authContext";
import { API_URL } from "../utils/config";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { movie } from "./MovieList";
import authFetch from "../utils/authFetch";

interface watchListItem {
  _id: number;
  name: string;

  description: string;
  score?: number;
  image?: string;
}

function SideNav({
  display,
  refetch,
  setQueriedMovies,
}: {
  refetch: boolean;
  display?: string;
  setQueriedMovies: Dispatch<SetStateAction<movie[]>>;
}) {
  const [watchList, setWatchList] = useState<watchListItem[]>();
  const [loading, setLoading] = useState(false);

  const {currentUser} = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (currentUser) {
        async function getWatchList() {
          try {
            setLoading(true);
            const response = await authFetch(`${API_URL}/watchlists`);
            const data = await response.json();
            setWatchList(data.data);
          } catch (error: any) {
            console.log(error.message);
          } finally {
            setLoading(false);
          }
        }
        getWatchList();
      } else {
        setWatchList([]);
      }
    },
    [currentUser, refetch]
  );

  return (
    <nav className={`navbar ${display}`}>
      <ul className="nav-list">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </li>

        <li>
          <input type="text" placeholder="Search" />
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => {
              setQueriedMovies([]);
            }}
          >
            {" "}
            <HouseIcon /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <HistoryIcon /> History
          </NavLink>
        </li>
        <li>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/createWatchlist");
            }}
            className="navbar-button"
          >
            <PlusIcon /> Create WatchList
          </Button>
          <hr />
        </li>
        <li>
          <p>My Lists</p>
        </li>
      </ul>
      <ul className="watchList">
        {loading ? (
          <Loader width="30" />
        ) : (
          watchList?.map((watchlistItem, i: number) => (
            <WatchListItem
              key={i}
              title={watchlistItem.name}
              image={watchlistItem.image!}
              id={watchlistItem._id}
            />
          ))
        )}

        <li>
          {currentUser ? (
            <NavLink to="/profilepage" className="profile ">
              <span
                className="flex"
                style={{ alignItems: "center", gap: "5px" }}
              >
                <img
                  src={`https://i.pravatar.cc/48?u=${currentUser._id}`}
                  alt={currentUser.name}
                  width="30px"
                />
                <p>{currentUser.name}</p>
              </span>

              <Ellipsis />
            </NavLink>
          ) : (
            <NavLink to="/login" className="profile ">
              <span
                className="flex"
                style={{ alignItems: "center", gap: "5px" }}
              >
                <img src="32.webp" alt="profile pic" width="30px" />
                <p>GUEST</p>
              </span>

              <Ellipsis />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

interface watchListItemProps {
  id: number;
  image: string;
  title: string;
  // setCurrentWatchListId: Function;
}

function WatchListItem({
  // image,
  title,
  id,
}: // setCurrentWatchListId,
watchListItemProps) {
  return (
    <li>
      <NavLink
        to={`/watchlistdetail/${id}`}
        className="watchList-item"
        // onClick={() => setCurrentWatchListId(id)}
      >
        <img src={`https://i.pravatar.cc/48?u=${id}`} alt="profile pic" width="30px" />
        <p>{title}</p>
      </NavLink>
    </li>
  );
}

export default SideNav;
