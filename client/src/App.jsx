import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="container">
      <p>COUCOU</p>
      <Outlet />
    </main>
  );
}

export default App;
