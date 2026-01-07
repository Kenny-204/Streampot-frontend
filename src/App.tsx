import { useState } from "react";
import HomePage from "./pages/homePage";
import Layout from "./layout/layout";
import CreateWatchList from "./pages/CreateWatchList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserLoginPage from "./pages/UserLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditWatchList from "./pages/editWatchList";
import History from "./pages/history";
import UserSignUp from "./pages/userSignup";
import WatchListDetail from "./pages/watchListDetails";
import MovieDetail from "./pages/movieDetail";
import { AuthProvider } from "./contexts/authContext";

import { movie } from "./components/MovieList";

import ProfilePage from "./pages/profilePage";
import StreamMovies from "./pages/streamMovies";
import ProtectedRoute from "./contexts/protectedRoute";

function App() {
  const [queriedMovies, setQueriedMovies] = useState<movie[]>([]);
  const [refetch, setRefetch] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout refetch={refetch} setQueriedMovies={setQueriedMovies}>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "/",
          element: (
            <HomePage
              setQueriedMovies={setQueriedMovies}
              queriedMovies={queriedMovies}
            />
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/createWatchlist",
              element: <CreateWatchList setRefetch={setRefetch} />,
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
              path: "/watchlistdetail/:id",
              element: <WatchListDetail />,
            },
          ],
        },
        {
          path: "/login",
          element: <UserLoginPage />,
        },

        {
          path: "/signup",
          element: <UserSignUp />,
        },
        {
          path: "/moviedetail/:currentMovie",
          element: <MovieDetail />,
        },
        {
          path: "/profilepage",
          element: <ProfilePage />,
        },
        {
          path: "/streammovie/:currentStream",
          element: <StreamMovies />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
