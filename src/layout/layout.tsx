import { ReactNode } from "react";
import Main from "../components/Main";
import SideNav from "../components/sideNav";

interface Layout {
  children: ReactNode;
  // setCurrentWatchListId: Function;
}

function Layout({
  children,

  // setCurrentWatchListId,
}: Layout) {
  return (
    <>
      <div className="container flex">
        <SideNav 
        // setCurrentWatchListId={setCurrentWatchListId} 
        />
        <Main>{children}</Main>
      </div>
    </>
  );
}

export default Layout;
