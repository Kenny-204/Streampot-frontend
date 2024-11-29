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


interface WatchListItem {
  id?: string;
  title: string;
  year?: string;
  poster?: string;
  description: string;
  score?: number;
  image?: string; 
}

interface CurrentWatchList {
  title: string;
  description: string;
  items: WatchListItem[];
}




function App() {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [watchListName, setWatchlistName] = useState<string>("");
  const [watchListDescription, setWatchlistDescription] = useState<string>("");
  const [currentWatchList, setCurrentWatchList] = useState<CurrentWatchList>({
    title: "",
    description: "",
    items:[]
  });
  const [currentMovie, setCurrentMovie] = useState<number>();

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
      items: []

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
          element: <History setCurrentMovie={setCurrentMovie} />,
        },
        {
          path: "/signup",
          element: <UserSignUp />,
        },
        {
          path: "/watchlistdetail",
          element: <WatchListDetail currentWatchlist={currentWatchList} setCurrentMovie={setCurrentMovie} />,
        },
        {
          path: "/moviedetail",
          element: <MovieDetail currentMovie={currentMovie!} />,
        }
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