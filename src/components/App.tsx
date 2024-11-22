import { useState } from "react";
import HomePage from "../pages/homePage";
import Layout from "../layout/layout";
import CreateWatchList from "../pages/CreateWatchList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserLoginPage from "../pages/UserLoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditWatchList from "../pages/editWatchList";
import History from "../pages/history";
import UserSignUp from "../pages/userSignup";
import WatchListDetail from "../pages/watchListDetails";
import MovieDetail from "../pages/movieDetail";
import { MovieList } from "./MovieList";

interface WatchListItem {
  title: string;
  image: string;
  description?: string;
}

interface CurrentWatchList {
  title: string;
  description: string;
  items: WatchListItem[];
}

interface CurrentMovie {
  name: string;
  image: string;
  year: string;
  description: string;
  score: number;
}

function App() {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [watchListName, setWatchlistName] = useState<string>("");
  const [watchListDescription, setWatchlistDescription] = useState<string>("");
  const [currentWatchList, setCurrentWatchList] = useState<CurrentWatchList>({
    title: "",
    description: "",
    items: []
  });
  const [currentMovie, setCurrentMovie] = useState<CurrentMovie | any>();

  function handleCreateWatchList() {
    // create a new list out of the inserted name and description
    const newList: WatchListItem = {
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
    const newCurrentWatchList: CurrentWatchList = {
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
          element: <HomePage setCurrentMovie={setCurrentMovie} />,
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
          path: "/watchlistdetail",
          element: <WatchListDetail currentWatchlist={currentWatchList} />,
        },
        {
          path: "/moviedetail",
          element: <MovieDetail currentMovie={currentMovie!} />,
        },
        {
          path: "/movieList",
          element: <MovieList />,
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