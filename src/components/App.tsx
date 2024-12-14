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
import { AuthProvider } from "../contexts/authContext";

import { movie } from "./MovieList";
// import { tempMovieData } from "./Main";
import ProfilePage from "../pages/profilePage";
import StreamMovies from "../pages/streamMovies";
import ProtectedRoute from "../contexts/protectedRoute";




function App() {
  const [queriedMovies, setQueriedMovies] = useState<movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<number>(0);
  const [streaming, setStreaming] = useState<number>(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage 
            setCurrentMovie={setCurrentMovie} 
            setQueriedMovies={setQueriedMovies} 
            queriedMovies={queriedMovies} 
          />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "createWatchlist",
              element: <CreateWatchList />,
            },
            {
              path: "editwatchlist",
              element: <EditWatchList />,
            },
            {
              path: "history",
              element: <History setCurrentMovie={setCurrentMovie} />,
            },
            {
              path: "watchlistdetail/:id",
              element: <WatchListDetail setCurrentMovie={setCurrentMovie} />,
            },
          ],
        },
        {
          path: "login",
          element: <UserLoginPage />,
        },
        {
          path: "signup",
          element: <UserSignUp />,
        },
        {
          path: "moviedetail",
          element: <MovieDetail
            currentMovie={currentMovie}
            setStreaming={setStreaming}
            setQueriedMovies={setQueriedMovies}
          />,
        },
        {
          path: "profilepage",
          element: <ProfilePage />,
        },
        {
          path: "streammovie",
          element: <StreamMovies streaming={streaming} />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
        }

export default App;
