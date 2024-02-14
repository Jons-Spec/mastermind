import { Badge } from "@mui/material";
import { useGuesses } from "../../context/GuessProvider";
import { Circle, StopCircle } from "@mui/icons-material";

interface Guess {
  color: string;
  blacks: number;
  whites: number;
}
const ListStyle = {
  listStyleType: "none",
};

function Board() {
  const { guesses } = useGuesses();
  return (
    <div className="Board">
      <ul style={ListStyle}>
        {guesses.map((g, guessIndex) => (
          <li key={guessIndex}>
            {g.guess.map((x: Guess, colorIndex: number) => (
              <Circle
                key={colorIndex}
                style={{ color: x.color, fontSize: "2.5rem" }}
              />
            ))}
            <Badge
              color="secondary"
              showZero
              overlap="circular"
              badgeContent={g.blacks}
            >
              <Circle style={{ color: "black" }} />
            </Badge>
            <Badge
              color="secondary"
              showZero
              overlap="circular"
              badgeContent={g.whites}
            >
              <Circle style={{ color: "white" }} />
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
