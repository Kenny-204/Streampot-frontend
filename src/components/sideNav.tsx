import { Button } from "./Button";
import { Link, NavLink } from "react-router-dom";
import { HouseIcon, HistoryIcon, PlusIcon, Ellipsis } from "./Icons";
import { useAuth } from "../contexts/authContext";
import WatchListDetail from "../pages/watchListDetails";

interface watchListItem {
  id?: string;
  title: string;
  year?: string;
  poster?: string;
  description: string;
  score?: number;
  image?: string;
}
interface watchList {
  watchList: watchListItem[] | undefined;
  setCurrentWatchList:Function;
}
function SideNav({ watchList,setCurrentWatchList }: watchList) {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar ">
      <ul className="nav-list">
        <li>
          <h2 className="logo">StreamPot</h2>
        </li>

        <li>
          <input type="text" placeholder="Search" />
        </li>
        <li>
          <NavLink to="/">
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
          <NavLink to="/createWatchlist" className="no-navlink">
            <Button className="navbar-button">
              <PlusIcon /> Create WatchList
            </Button>
          </NavLink>
          <hr />
        </li>
        <li>
          <p>My Lists</p>
        </li>
      </ul>
      <ul className="watchList">
        {watchList?.map((watchlistItem, i: number) => (
          <WatchListItem
            key={i}
            title={watchlistItem.title}
            image={watchlistItem.image!}
            setCurrentWatchList={setCurrentWatchList}
          />
        ))}

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
              <Link to="/signup">
                <Ellipsis />
              </Link>
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

interface watchListItemProps{
image:string;
title:string;
setCurrentWatchList:Function
}

function WatchListItem({ image, title,setCurrentWatchList }:watchListItemProps) {
  return (

    <li>
     <NavLink to='/watchlistdetail'  className="watchList-item">
      <img src={image} alt="profile pic" width="30px" />
      <p>{title}</p>
      </NavLink>
    </li>
  );
}

export default SideNav;
