import "./App.css";
import { Outlet } from "react-router-dom";
import NavBarBottom from "./components/NavBarBottom/NavBarBottom";
import { BurgerMenuProvider } from "./contexts/BurgerMenuContext";

function App() {
  return (
    <BurgerMenuProvider>
      <main className="container">
        <NavBarBottom />
        <Outlet />
      </main>
    </BurgerMenuProvider>
  );
}

export default App;
