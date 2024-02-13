import { useEffect } from "react";
import _ from "lodash";
import Boardheader from "../../components/boardhead/boardhead";
import { Container } from "../../components/container/container";
import Secret from "../../components/secret/secret";
import { useSecret } from "../../context/SecretProvider";
import pegs from "../../resources/pegs";
import { useGameStatus } from "../../context/GameStatusProvider";
import { useGuesses } from "../../context/GuessProvider";
import { Divider } from "@mui/material";

export default function Game() {
  const { secret, setSecret } = useSecret();
  const { gameStatus, setGameStatus } = useGameStatus();
  const { guesses, setGuesses } = useGuesses();

  useEffect(() => {
    if (
      gameStatus.active &&
      guesses.length > 1 &&
      _.last(guesses)?.blacks === 4
    ) {
      setGameStatus({ active: false });
      setSecret({ pegs: secret.pegs, display: true });
    } else if (gameStatus.active && guesses.length > 9) {
      setGameStatus({ active: false });
      setSecret({ pegs: secret.pegs, display: true });
    }
  }, [gameStatus.active, guesses, secret.pegs, setGameStatus, setSecret]);
  return (
    <>
      <Container>
        <Boardheader pegs={pegs} />
        {secret.pegs.length > 1 && (
          <Secret secret={secret.pegs} display={secret.display} />
        )}
        <Divider />
      </Container>
    </>
  );
}
