import { Box, styled } from "@mui/material";
import React from "react";

const DropsFromTopContainer = styled(Box)({
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 0,
});

const DropsLiquid = styled(Box)({
  clipPath:
    "polygon(1% 1%, 24% 8%, 42% 19%, 46% 36%, 49% 71%, 52% 97%, 56% 71%, 57% 44%, 69% 24%, 82% 11%, 98% 2%)",
  height: "20vh",
  width: "50vw",
  background: "#ab47bc",
  animation: "toDown 5s ease-out infinite",
  "@keyframes toDown": {
    "0%": {
      height: "20vh",
    },
    "70%": {
      height: "70vh",
    },
    "100%": {
      height: "25vh",
    },
  },
});

const DropsFall = styled(Box)({
  clipPath:
    "polygon(47% 2%, 43% 13%, 39% 26%, 31% 38%, 21% 48%, 15% 70%, 26% 87%, 45% 96%, 65% 87%, 75% 67%, 76% 49%, 64% 37%, 58% 27%, 52% 13%)",
  position: "fixed",
  height: "10vh",
  width: "10vh",
  background: "#ab47bc",
  top: 0,
  right: "20vw",
  zIndex: 0,
  animation: "drop2 5s 1.3s ease-out infinite",
  "@keyframes drop2": {
    "0%": {
      top: "0",
    },
    "100%": {
      top: "100%",
    },
  },
});

const DropsFromTop = (): JSX.Element => {
  return (
    <DropsFromTopContainer>
      <DropsLiquid />
      <DropsFall />
    </DropsFromTopContainer>
  );
};

export default DropsFromTop;
