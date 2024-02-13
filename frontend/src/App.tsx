import { Routes, Route } from "react-router";
import Home from "./pages/home/home";
import "./App.css";
import Game from "./pages/game/game";
import GameStatusProvider from "./context/GameStatusProvider";
import SecretProvider from "./context/SecretProvider";
import GuessProvider from "./context/GuessProvider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameStatusProvider>
          <SecretProvider>
            <GuessProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
              </Routes>
            </GuessProvider>
          </SecretProvider>
        </GameStatusProvider>
      </header>
    </div>
  );
}

export default App;
