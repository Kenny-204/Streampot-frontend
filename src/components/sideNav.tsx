const WatchList = [
  {
    image: "32.webp",
    title: "Movies by Tom Cruise",
  },
  {
    image: "32.webp",
    title: "Movies by Tom Cruise",
  },
  {
    image: "32.webp",
    title: "Movies by Tom Cruise",
  },
];

function SideNav() {
  return (
    <nav className="navbar ">
      <ul className="nav-list">
        <li>
          <h2 className="logo">Capstone</h2>
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
          <button>
            <span className="fa fa-plus"></span> <b>Create WatchList</b>
          </button>
          <hr />
        </li>
        <li>
          <p>My Lists</p>
        </li>
      </ul>
      <ul className="watchList" >
        {WatchList.map((watchlistItem, i) => (
          <WatchListItem
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

function WatchListItem({ image, title }) {
  return (
    <li className="watchList-item flex">
      <img src={image} alt="profile pic" width="30px" />
      <p>{title}</p>
    </li>
  );
}

export default SideNav;
