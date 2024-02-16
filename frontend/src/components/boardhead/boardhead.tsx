import React from "react";
import _ from "lodash";
// context providers
import { useSecret } from "../../context/SecretProvider";
import { useGameStatus } from "../../context/GameStatusProvider";
import { useGuesses } from "../../context/GuessProvider";
// components
import { Button, ButtonGroup } from "@mui/material";

interface HeaderProps {
  pegs: any[]; // Define the type of pegs as needed
}

function genSecret(arr: any[], n: number) {
  let secret = _.map(arr, (x) => _.sample(arr));
  return { pegs: _.take(secret, n), display: false };
}

const Boardheader: React.FC<HeaderProps> = ({ pegs }) => {
  const { setSecret } = useSecret();
  const { setGameStatus } = useGameStatus();
  const { setGuesses } = useGuesses();

  return (
    <header className="Header">
      <h1 style={{ textAlign: "center" }}>Mastermindo</h1>
      <ButtonGroup>
        <Button
          onClick={() => {
            setSecret(genSecret(pegs, 4));
            setGameStatus({
              active: true,
            });
            setGuesses([]);
          }}
        >
          New Game
        </Button>
      </ButtonGroup>
    </header>
  );
};

export default Boardheader;
