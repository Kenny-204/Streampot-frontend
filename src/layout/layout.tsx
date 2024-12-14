import { ReactNode } from "react";
import Main from "../components/Main";
import SideNav from "../components/sideNav";

interface Layout {
  children: ReactNode;
}

function Layout({ children }: Layout) {
  return (
    <>
      <div className="container flex">
        <SideNav />
        <Main>{children}</Main>
      </div>
    </>
  );
}

export default Layout;
