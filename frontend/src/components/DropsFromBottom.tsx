import { Box, styled } from "@mui/material";
import React from "react";

const DropsFromBottomContainer = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: 0,
});

const DropsLiquid = styled(Box)({
  clipPath:
    "polygon(1% 99%, 29% 83%, 41% 63%, 48% 17%, 53% 6%, 59% 16%, 64% 61%, 74% 81%, 99% 99%)",
  height: "10vh",
  width: "30vw",
  background: "#0288d1",

  animation: "toUp 5s ease-out infinite",
  "@keyframes toUp": {
    "0%": {
      height: "10vh",
    },
    "70%": {
      height: "70vh",
    },
    "100%": {
      height: "5vh",
    },
  },
});
const DropsFall = styled(Box)({
  clipPath:
    "polygon(49% 100%, 33% 75%, 20% 46%, 24% 16%, 48% 2%, 76% 14%, 79% 43%, 67% 76%)",
  position: "fixed",
  height: "12vh",
  width: "12vh",
  background: "#0288d1",
  bottom: 0,
  left: "12vw",
  zIndex: 0,
  animation: "drop 5s 1s ease-out infinite",
  "@keyframes drop": {
    "0%": {
      bottom: "0",
    },
    "100%": {
      bottom: "100%",
    },
  },
});

const DropsFromBottom = (): JSX.Element => {
  return (
    <DropsFromBottomContainer>
      <DropsLiquid />
      <DropsFall />
    </DropsFromBottomContainer>
  );
};

export default DropsFromBottom;
