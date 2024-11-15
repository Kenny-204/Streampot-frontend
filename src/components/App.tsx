// import SideNav from "./sideNav";
// import Main from "./Main";
// import { WelcomeSection, SearchBar } from "./Main";
// import { MovieList } from "./MovieList";

import { FormEvent, useState } from "react";
// import History from "./history";
// import WatchListDetail from "./watchListDetails";
// import UserSignUp from "./userSignup";
// import EditWatchList from "./editWatchList";
import HomePage from "../pages/homePage";
import Layout from "../layout/layout";
import CreateWatchList from "../pages/CreateWatchList";
// import UserLoginPage from "./UserLogin";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

interface watchListItem {
  title: string;
  image: string;
}

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <HomePage />,
//   },
// ]);

function App() {
  const [watchList, setWatchList] = useState<watchListItem[]>([]);
  const [watchListName, setWatchlistName] = useState("");
  const [watchListDescription, setWatchlistDescription] = useState("");

  function handleCreateWatchList(e: FormEvent<HTMLFormElement>) {
    // prevent page reload
    e.preventDefault();
    // if theres no name or description
    if (!watchListName || !watchListDescription) return;

    // create a new list out of the inserted name and description
    const newList = {
      image: "32.webp",
      title: watchListName,
      description: watchListDescription,
    };
    // add the new list to the original list
    setWatchList([...watchList, newList]);
    // reset the form values
    setWatchlistName("");
    setWatchlistDescription("");
  }

  return (
    <>
      <div className="container flex">
        <Layout watchList={watchList}>
          <HomePage/>
          {/* <RouterProvider router={router} /> */}
          {/* <CreateWatchList
            watchListName={watchListName}
            watchListDescription={watchListDescription}
            setWatchlistName={setWatchlistName}
            setWatchlistDescription={setWatchlistDescription}
            onCreateWatchList={handleCreateWatchList}
          /> */}
        </Layout>

        {/* <Main>
          <UserLoginPage />
        </Main> */}
        {/* <Main>
          <History />
        </Main> */}
        {/* <Main>
          <WatchListDetail />
        </Main> */}
        {/* <Main>
          <UserSignUp />
        </Main> */}
        {/* <Main>
          <EditWatchList/>
        </Main> */}
      </div>
    </>
  );
}

export default App;
