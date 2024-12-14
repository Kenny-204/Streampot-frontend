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
  // import { tempMovieData } from "./Main";
 import ProfilePage from "./pages/profilePage";
 import StreamMovies from "./pages/streamMovies";
 import ProtectedRoute from "./contexts/protectedRoute";

 function App() {
   const [queriedMovies, setQueriedMovies] = useState<movie[]>([]);
    // const [currentWatchListId, setCurrentWatchListId] = useState<number>(Number);
   const [currentMovie, setCurrentMovie] = useState<number>(Number);
   const [streaming, setStreaming] = useState<number>(Number);

   const router = createBrowserRouter([
     {
       path: "/",
       element: (
         <Layout>
           <Outlet />
         </Layout>
       ),
       children: [
         {
           path: "/",
           element: (
             <HomePage
               setCurrentMovie={setCurrentMovie}
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
               element: <CreateWatchList />,
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
               path: "/watchlistdetail/:id",
               element: (
                 <WatchListDetail
                    // currentWatchlistId={currentWatchListId}
                   setCurrentMovie={setCurrentMovie}
                 />
               ),
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
           path: "/moviedetail",
           element: (
             <MovieDetail
               currentMovie={currentMovie}
               setStreaming={setStreaming}
               setQueriedMovies={setQueriedMovies}
             />
           ),
         },
         {
           path: "/profilepage",
           element: <ProfilePage />,
         },
         {
           path: "/streammovie",
           element: <StreamMovies streaming={streaming} />,
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
