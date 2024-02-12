import { ReactElement, createContext, useContext, useState } from "react";

const SecretContext = createContext("secret");

export default function SecretProvider({
  children,
}: {
  children: ReactElement;
}) {
  let [secret, setSecret] = useState({ pegs: [], display: false });
  return (
    <SecretContext.Provider value={{ secret, setSecret }}>
      {children}
    </SecretContext.Provider>
  );
}

export function useSecret() {
  const context = useContext(SecretContext);
  if (!context)
    throw new Error("useSecret must be used within a context provider");
  const { secret, setSecret } = context;
  return { secret, setSecret };
}
