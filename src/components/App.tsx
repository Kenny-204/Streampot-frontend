import SideNav from "./sideNav";
import Main from "./Main";
// import { WelcomeSection, SearchBar } from "./Main";
import { MovieList } from "./MovieList";
// import CreateWatchList from "./CreateWatchList";
import { FormEvent, useState } from "react";
import History from "./history";
import WatchListDetail from "./watchListDetails";
// import UserLoginPage from "./UserLogin";

function App() {
  const [watchList, setWatchList] = useState<object[]>([]);
  // const [watchListName, setWatchlistName] = useState("");
  // const [watchListDescription, setWatchlistDescription] = useState("");

  // function handleCreateWatchList(e: FormEvent<HTMLFormElement>) {
  //   // prevent page reload
  //   e.preventDefault();
  //   // if theres no name or description
  //   if (!watchListName || !watchListDescription) return;

  //   // create a new list out of the inserted name and description
  //   const newList = {
  //     image: "32.webp",
  //     title: watchListName,
  //     description: watchListDescription,
  //   };
  //   // add the new list to the original list
  //   setWatchList([...watchList, newList]);
  //   // reset the form values
  //   setWatchlistName("");
  //   setWatchlistDescription("");
  // }

  return (
    <>
      <div className="container flex">
        <SideNav watchList={watchList} />
        {/* <Main>
          <WelcomeSection />
          <SearchBar />
          <MovieList>
            <div className="title">
              <p>Popular movies right now</p>
            </div>
          </MovieList>
        </Main> */}
        {/* <Main>
          <CreateWatchList
            watchListName={watchListName}
            watchListDescription={watchListDescription}
            setWatchlistName={setWatchlistName}
            setWatchlistDescription={setWatchlistDescription}
            onCreateWatchList={handleCreateWatchList}
          />
        </Main> */}
        {/* <Main>
          <UserLoginPage />
        </Main> */}
        {/* <Main>
          <History />
        </Main> */}
        <Main>
          
            <WatchListDetail />
          
        </Main>
      </div>
    </>
  );
}

export default App;
