import { ReactNode } from "react";
import Main from "../components/Main";
import SideNav from "../components/sideNav";

interface watchListItem {
  id?: string;
  title: string;
  year?: string;
  poster?: string;
  description: string;
  score?: number;
  image?: string; 
}
interface Layout {
  watchList: watchListItem[] | undefined;
  children: ReactNode;
  setCurrentWatchList:Function
}

function Layout({ children, watchList,setCurrentWatchList }: Layout) {
  return (
    <>
      <div className="container flex">
        <SideNav watchList={watchList} setCurrentWatchList={setCurrentWatchList} />
        <Main>{children}</Main>
      </div>
    </>
  );
}

export default Layout;
