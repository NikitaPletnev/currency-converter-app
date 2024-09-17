import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import CurrencyConverter from "./components/CurrencyConverter";
import { Container, Typography } from "@material-ui/core";

function App() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Currency Converter
        </Typography>
        <CurrencyConverter />
      </Container>
    </ApolloProvider>
  );
}

export default App;
