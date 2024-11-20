import { Button } from "./Button";
import { NavLink } from "react-router-dom";
import { HouseIcon, HistoryIcon, PlusIcon, CommentIcon } from "./Icons";

interface watchListItem {
  title: string;
  image: string;
}
interface watchList {
  watchList: watchListItem[] | undefined;
}
function SideNav({ watchList }: watchList) {
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
            image={watchlistItem.image}
          />
        ))}

        <li>
          <div className="profile flex">
            <img src="32.webp" alt="profile pic" width="30px" />
            <p>GUEST</p>
            <NavLink to="/signup" className="no-navlink">
              <CommentIcon />
            </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function WatchListItem({ image = "", title = "" }) {
  return (
    <li className="watchList-item flex">
      <img src={image} alt="profile pic" width="30px" />
      <p>{title}</p>
    </li>
  );
}

export default SideNav;
