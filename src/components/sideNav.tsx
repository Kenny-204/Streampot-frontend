import { Button } from "./Button";

// const WatchList = [
//   {
//     image: "32.webp",
//     title: "Movies by Tom Cruise",
//   },
//   {
//     image: "32.webp",
//     title: "Movies by Tom Cruise",
//   },
//   {
//     image: "32.webp",
//     title: "Movies by Tom Cruise",
//   },
// ];

interface watchListItem {
  title: string;
  image: string;
}
interface watchList {
  watchList: watchListItem[];
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
          <a href="#" className="active">
            <span className="fa fa-home-lg"> </span> Home
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-history"></span> History
          </a>
        </li>
        <li>
          <Button className="navbar-button">
            <span className="fa fa-plus"></span> Create WatchList
          </Button>
          <hr />
        </li>
        <li>
          <p>My Lists</p>
        </li>
      </ul>
      <ul className="watchList">
        {watchList.map((watchlistItem, i: number) => (
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
            <span className="fa fa-comment-dots"></span>
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
