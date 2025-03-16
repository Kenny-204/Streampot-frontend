import { Button } from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { HouseIcon, HistoryIcon, PlusIcon, Ellipsis } from "./Icons";
import { useAuth } from "../contexts/authContext";
import { API_URL } from "../config";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

interface watchListItem {
  id: number;
  name: string;
  
  description: string;
  score?: number;
  image?: string;
}

function SideNav({display}: {display?:string}) {
  const [watchList, setWatchList] = useState<watchListItem[]>();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (currentUser) {
        async function getWatchList() {
          try {
            setLoading(true);
            const response = await fetch(
              `${API_URL}/watchlist/user/${currentUser.id}`
            );
            const data = await response.json();
            setWatchList(data);
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
    [currentUser]
  );

  console.log(currentUser);
  
  return (
    <nav className={`navbar ${display}`}>
      <ul className="nav-list">
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </li>

        <li>
          <input type="text" placeholder="Search" />
        </li>
        <li>
          <NavLink
            to="/"
            // onClick={() => {
            //   localStorage.clear();
            // }}
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
              id={watchlistItem.id}
          
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
                  src={`https://i.pravatar.cc/48?u=${currentUser.id}`}
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
  // setCurrentWatchListId,
}: watchListItemProps) {
  return (
    <li>
      <NavLink
        to={`/watchlistdetail/${id}`}
        className="watchList-item"
        // onClick={() => setCurrentWatchListId(id)}
      >
        <img src="32.webp" alt="profile pic" width="30px" />
        <p>{title}</p>
      </NavLink>
    </li>
  );
}

export default SideNav;
