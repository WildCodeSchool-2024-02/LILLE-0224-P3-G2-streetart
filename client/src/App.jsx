import "./App.css";
import { Outlet } from "react-router-dom";
import NavBarBottom from "./components/NavBarBottom/NavBarBottom";
import { BurgerMenuProvider } from "./contexts/BurgerMenuContext";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import TopBar from "./components/TopBar/TopBar";
//  Road Map
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BurgerMenuProvider>
      <TopBar title="Spot Lille Art" />
      <AsideMenu />
      <main className="main-container">
        <Outlet />
      </main>
      <NavBarBottom />
    </BurgerMenuProvider>
  );
}

export default App;
