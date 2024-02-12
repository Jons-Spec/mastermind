import { Routes, Route } from "react-router";
import Home from "./pages/home/home";
import "./App.css";
import Game from "./pages/game/game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
