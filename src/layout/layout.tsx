import Main from "../components/Main";
import SideNav from "../components/sideNav";

interface watchListItem {
  title: string;
  image: string;
}
interface Layout {
  watchList: watchListItem[] | undefined;
  children: any;
}

function Layout({ children, watchList }: Layout) {
  return (
    <>
      <SideNav watchList={watchList} />
      <Main>{children}</Main>
    </>
  );
}

export default Layout;
