import { ReactNode, useState } from "react";
import Main from "../components/Main";
import SideNav from "../components/sideNav";
import { Close, Hamburger } from "../components/Icons";

interface Layout {
  children: ReactNode;
}

function Layout({ children }: Layout) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  function toggleNav() {
    setIsNavOpen((isNavOpen) => !isNavOpen);
    console.log(isNavOpen);
  }
  return (
    <>
      <header className="flex">
        <h2 className="logo">StreamPot</h2>

        {isNavOpen ? <Close onClick={()=>toggleNav()}/> : <Hamburger onClick={() => toggleNav()} />}
      </header>
      <div className="container flex">
        <SideNav display={isNavOpen ? "" : "hidden"} />
        <Main
          onClick={() => {
            setIsNavOpen(false);
          }}
        >
          {children}
        </Main>
      </div>
    </>
  );
}

export default Layout;
