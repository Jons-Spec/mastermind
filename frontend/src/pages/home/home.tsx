import { Button } from "@mui/material";
import { Container } from "../../components/container/container";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Container>
        <h1>Mastermindo</h1>
        <Button component={Link} to="/game" variant="contained" size="large">
          Let's play
        </Button>
      </Container>
    </>
  );
}
