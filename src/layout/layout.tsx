import { ReactNode } from "react";
import Main from "../components/Main";
import SideNav from "../components/sideNav";

interface watchListItem {
  title: string;
  image: string;
}
interface Layout {
  watchList: watchListItem[] | undefined;
  children: ReactNode;
}

function Layout({ children, watchList }: Layout) {
  return (
    <>
      <div className="container flex">
        <SideNav watchList={watchList} />
        <Main>{children}</Main>
      </div>
    </>
  );
}

export default Layout;
