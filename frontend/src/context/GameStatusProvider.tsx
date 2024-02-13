import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for your game status
interface GameStatus {
  active: boolean;
}

// Define the context type
interface GameStatusContextType {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

// Create context with initial value of undefined
const GameStatusContext = createContext<GameStatusContextType | undefined>(
  undefined
);

// Create a functional component with children prop
export default function GameStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameStatus, setGameStatus] = useState<GameStatus>({ active: false });

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
}

// Custom hook to consume the context
export function useGameStatus() {
  const context = useContext(GameStatusContext);
  if (!context) throw new Error("useGameStatus must be used within a provider");
  return context;
}
