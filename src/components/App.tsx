import SideNav from "./sideNav";
import Main from "./Main";
import { WelcomeSection, SearchBar, MovieList } from "./Main";
import CreateWatchList from "./CreateWatchList";

function App() {
  return (
    <>
      <div className="container flex">
        <SideNav />
        {/* <Main>
          <WelcomeSection />
          <SearchBar />
          <MovieList />
        </Main> */}
        <Main>
          <CreateWatchList/>
        </Main>
      </div>
    </>
  );
}

export default App;
