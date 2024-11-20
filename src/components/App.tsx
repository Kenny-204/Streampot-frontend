import { FormEvent, useState } from "react";
import HomePage from "../pages/homePage";
import Layout from "../layout/layout";
import CreateWatchList from "../pages/CreateWatchList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserLoginPage from "../pages/UserLoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditWatchList from "../pages/editWatchList";
import History from "../pages/history";
import UserSignUp from "../pages/userSignup";
import SearchResult from "../pages/searchResult";
import WatchListDetail from "../pages/watchListDetails";

interface watchListItem {
  title: string;
  image: string;
}

function App() {
  const [watchList, setWatchList] = useState<watchListItem[]>([]);
  const [watchListName, setWatchlistName] = useState("");
  const [watchListDescription, setWatchlistDescription] = useState("");
  const [currentWatchList, setCurrentWatchList] = useState<typeof watchList>(
    []
  );

  function handleCreateWatchList() {
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

  function handleSetCurrentWatchList() {
    const newCurrentWatchList = {
      title: watchListName,
      description: watchListDescription,
      items: [],
    };
    setCurrentWatchList(newCurrentWatchList);
    console.log(currentWatchList);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout watchList={watchList}>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <UserLoginPage />,
        },
        {
          path: "/createWatchlist",
          element: (
            <CreateWatchList
              watchListName={watchListName}
              watchListDescription={watchListDescription}
              setWatchlistName={setWatchlistName}
              setWatchlistDescription={setWatchlistDescription}
              onCreateWatchList={handleCreateWatchList}
              onSetCurrentWatchList={handleSetCurrentWatchList}
            />
          ),
        },
        {
          path: "/editwatchlist",
          element: <EditWatchList />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/signup",
          element: <UserSignUp />,
        },
        {
          path: "/searchresults",
          element: <SearchResult />,
        },
        {
          path: "/watchlistdetail",
          element: <WatchListDetail currentWatchlist={currentWatchList} />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
