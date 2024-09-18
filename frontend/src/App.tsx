import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import DropsFromBottom from "./components/DropsFromBottom";
import DropsFromTop from "./components/DropsFromTop";
import { client } from "./graphql/client";
import CurrencyConverter from "./components/CurrencyConverter";

const AppContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backdropFilter: "blur(20px)",
  zIndex: 2,
});

const ShadowContainer = styled(Box)({
  padding: "20px",
  borderRadius: "70px",
});

function App() {
  const [shadow, setShadow] = useState({
    offsetX: 0,
    offsetY: 0,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const block = event.currentTarget.getBoundingClientRect();

    const offsetX = (event.clientX - block.left - block.width / 2) / 10;
    const offsetY = (event.clientY - block.top - block.height / 2) / 10;

    setShadow({
      offsetX,
      offsetY,
    });
  };

  return (
    <ApolloProvider client={client}>
      <Box>
        <AppContainer onMouseMove={handleMouseMove}>
          <ShadowContainer
            sx={{
              boxShadow: `${-shadow.offsetX}px ${-shadow.offsetY}px 30px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <CurrencyConverter />
          </ShadowContainer>
        </AppContainer>
        <DropsFromBottom />
        <DropsFromTop />
      </Box>
    </ApolloProvider>
  );
}

export default App;
