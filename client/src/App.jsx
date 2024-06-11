import "./App.css";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <main className="container">
      <TopBar title="Spot Lille Art" />
      <Outlet />
    </main>
  );
}

export default App;
