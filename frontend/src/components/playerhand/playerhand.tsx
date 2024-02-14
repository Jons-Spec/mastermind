import { useReducer } from "react";
import { useGuesses } from "../../context/GuessProvider";
import { Grid, Container, Box, Button, ButtonGroup } from "@mui/material";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { Circle } from "@mui/icons-material";

interface Peg {
  color: string;
  num: number; // Assuming there is a 'num' property in the Peg object
}

interface Guess {
  color: string;
  id: string;
}

interface State {
  guess: Guess[];
}

interface Action {
  type: string;
  payload?: any;
}

function getNotInGuess(secret: number[], guess: number[]) {
  let guess_ = guess.slice();
  let res: number[] = [];
  secret.forEach((el) => {
    if (guess_.includes(el)) {
      guess_.splice(guess_.indexOf(el), 1);
    } else {
      res.push(el);
    }
  });
  return res;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add":
      if (state.guess.length <= 3) {
        return {
          guess: _.concat(state.guess, { ...action.payload, id: uuid() }),
        };
      }
      return state;
    case "remove":
      return {
        guess: _.filter(state.guess, (el) => el.id !== action.payload.id),
      };
    case "reset":
      return { guess: [] };
    default:
      throw new Error();
  }
}

function getScore(guess: Peg[], secret: Peg[]) {
  if (guess.length === 4 && secret.length === 4) {
    let guess_ = _.map(guess, (x) => x.num),
      secret_ = _.map(secret, (x) => x.num),
      zip_ = _.zip(guess_, secret_),
      rights = _.map(zip_, (x) => (x[0] === x[1] ? 1 : 0)),
      rights_ = _.reduce(rights, (x, y) => x + y, 0),
      sNotInGuess = getNotInGuess(secret_, guess_),
      wrongs_ = secret.length - sNotInGuess.length - rights_;
    return { guess, blacks: rights_, whites: wrongs_ };
  } else {
    return {};
  }
}

function PlayerHand({
  pegs,
  secret,
  gameStatus,
}: {
  pegs: Peg[];
  secret: Peg[];
  gameStatus: boolean;
}) {
  let [state, dispatch] = useReducer(reducer, { guess: [] } as State);
  let { guesses, setGuesses } = useGuesses();

  return (
    <Container>
      <Box display="flex" justifyContent="center" m={2} minHeight="60px">
        {state.guess.map((g) => (
          <Circle
            key={g.id}
            style={{ color: g.color, fontSize: "2.5rem", cursor: "pointer" }}
            onClick={() => dispatch({ type: "remove", payload: g })}
          />
        ))}
      </Box>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        {pegs.map((p) => (
          <Grid item xs={6} sm={4} md={2} key={p.num}>
            <Button
              style={{
                backgroundColor: p.color,
                color: p.color,
                width: "100%",
              }}
              onClick={() => dispatch({ type: "add", payload: p })}
            >
              {p.color}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box m={1} display="flex" flexDirection="row" justifyContent="center">
        <ButtonGroup>
          <Button
            onClick={() => {
              if (
                state.guess.length === 4 &&
                secret.length === 4 &&
                gameStatus
              ) {
                setGuesses(_.concat(guesses, getScore(state.guess, secret)));
                dispatch({ type: "reset" });
              }
            }}
          >
            guess
          </Button>
          <Button onClick={() => dispatch({ type: "reset" })}>reset</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default PlayerHand;
