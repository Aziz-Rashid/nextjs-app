import { Logo } from "../Logo";
import HeaderBanner from "./children/HeaderBanner";

import GlobalSearch from "./children/GlobalSearch";
import Navbar from "./children/Navbar";
import { MenuMobile } from "./children/MenuMobile";

export function Header({courses}) {
  return (
    <header id="header">
      <HeaderBanner courses={courses} />
      <div id="nprogress-container" className="container">
        <MenuMobile />
        <Logo width="150px" minWidth={"150px"} />
        <GlobalSearch />
        <Navbar />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;          
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          padding: 0 0.5rem;
          z-index: 1;
        }
        @media (min-width: 1000px){
          position: relative;
        }
      `}</style>
    </header>
  );
}
