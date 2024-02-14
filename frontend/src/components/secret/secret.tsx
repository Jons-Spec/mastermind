import React from "react";
import { Box } from "@mui/material";
import { Circle } from "@mui/icons-material";

interface SecretProps {
  secret: { color: string }[]; // Define type for secret
  display: boolean;
}

const Secret: React.FC<SecretProps> = ({ secret, display }) => {
  return (
    <Box m={2}>
      {display
        ? secret.map((s, index) => (
            <Circle
              key={index}
              style={{ color: s.color, fontSize: "3rem" }}
            ></Circle>
          ))
        : secret.map((s, index) => (
            <Circle
              key={index}
              style={{ color: "white", fontSize: "3rem" }}
            ></Circle>
          ))}
    </Box>
  );
};

export default Secret;
