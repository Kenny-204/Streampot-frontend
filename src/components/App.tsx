import { FormEvent, useState } from "react";
import HomePage from "../pages/homePage";
import Layout from "../layout/layout";
import CreateWatchList from "../pages/CreateWatchList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLoginPage from "../pages/UserLoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditWatchList from "../pages/editWatchList";
import History from "../pages/history";
import UserSignUp from "../pages/userSignup";
import SearchResult from "../pages/searchResult";


interface watchListItem {
  title: string;
  image: string;
}

function App() {
  const [watchList, setWatchList] = useState<watchListItem[]>([]);
  const [watchListName, setWatchlistName] = useState("");
  const [watchListDescription, setWatchlistDescription] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
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
   
  ]);

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
          <RouterProvider router={router} />
        </Layout>
      </div>
    </>
  );
}

export default App;
