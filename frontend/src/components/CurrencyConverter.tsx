import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { CONVERT_CURRENCY } from "../graphql/queries";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";

const CurrencyConverter: React.FC = () => {
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertCurrency, { loading, data, error }] =
    useLazyQuery(CONVERT_CURRENCY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertCurrency({
      variables: {
        input: {
          sourceCurrency,
          targetCurrency,
          amount: Number(amount),
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <TextField
            label="Source Currency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value.toUpperCase())}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Target Currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Convert
          </Button>
        </Grid>
        <Grid item>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error.message}</Typography>}
          {data && (
            <Typography variant="h6">Result: {data.convertCurrency}</Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default CurrencyConverter;
