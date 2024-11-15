import Main, { SearchBar, WelcomeSection } from "../components/Main";
import { MovieList } from "../components/MovieList";
import SideNav from "../components/sideNav";

function HomePage() {
  return (
    <>
      {/* <SideNav watchList={watchList} /> */}
      
        <WelcomeSection />
        <SearchBar />
        <MovieList>
          <div className="title">
            <p>Popular movies right now</p>
          </div>
        </MovieList>
      
    </>
  );
}

export default HomePage