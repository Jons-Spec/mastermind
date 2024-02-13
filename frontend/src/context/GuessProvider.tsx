import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for your guesses
type Guess = any; // Change the type as needed

// Define the context type
interface GuessContextType {
  guesses: Guess[];
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
}

// Create context with initial value of undefined
const GuessContext = createContext<GuessContextType | undefined>(undefined);

// Create a functional component with children prop
export default function GuessProvider({ children }: { children: ReactNode }) {
  const [guesses, setGuesses] = useState<Guess[]>([]);

  return (
    <GuessContext.Provider value={{ guesses, setGuesses }}>
      {children}
    </GuessContext.Provider>
  );
}

// Custom hook to consume the context
export function useGuesses() {
  const context = useContext(GuessContext);
  if (!context) throw new Error("useGuesses must be used within a provider");
  return context;
}
