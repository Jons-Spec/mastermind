import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for your secret
interface Secret {
  pegs: any[]; // Change the type as needed
  display: boolean;
}

// Define the context type
interface SecretContextType {
  secret: Secret;
  setSecret: React.Dispatch<React.SetStateAction<Secret>>;
}

// Create context with initial value of undefined
const SecretContext = createContext<SecretContextType | undefined>(undefined);

// Create a functional component with children prop
export default function SecretProvider({ children }: { children: ReactNode }) {
  const [secret, setSecret] = useState<Secret>({ pegs: [], display: false });

  return (
    <SecretContext.Provider value={{ secret, setSecret }}>
      {children}
    </SecretContext.Provider>
  );
}

// Custom hook to consume the context
export function useSecret() {
  const context = useContext(SecretContext);
  if (!context)
    throw new Error("useSecret must be used within a context provider");
  return context;
}
