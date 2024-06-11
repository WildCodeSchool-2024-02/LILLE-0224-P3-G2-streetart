import "./App.css";
import { Outlet } from "react-router-dom";
import NavBarBottom from "./components/NavBarBottom/NavBarBottom";
import { BurgerMenuProvider } from "./contexts/BurgerMenuContext";
import AsideMenu from "./components/AsideMenu/AsideMenu";

function App() {
  return (
    <BurgerMenuProvider>
      <main className="main-container">
        <AsideMenu />
        <Outlet />
      </main>
      <NavBarBottom />
    </BurgerMenuProvider>
  );
}

export default App;
