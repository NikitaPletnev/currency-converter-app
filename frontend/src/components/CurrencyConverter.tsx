import { styled } from "@mui/material";
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

const CurrencyConverterForm = styled("form")({
  padding: "70px",
  borderRadius: "50px",
  transition: "all .5s cubic-bezier(0,1.73,.74,.94)",
  "&.blur": {
    boxShadow: "inset 0px 0px 40px 0px rgba(0,0,0,0.75)",
  },
});

const CurrencyConverter: React.FC = () => {
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [convertCurrency, { loading, data, error }] =
    useLazyQuery(CONVERT_CURRENCY);
  const [focus, setFocus] = useState<boolean>(false);

  const handleFocus = (): void => {
    setFocus(true);
  };

  const handleBlur = (): void => {
    setFocus(false);
  };

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
    <CurrencyConverterForm
      onSubmit={handleSubmit}
      className={!focus ? "blur" : ""}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Currency Converter
      </Typography>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <TextField
            label="Source Currency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value.toUpperCase())}
            required
            inputProps={{
              maxLength: 3,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Target Currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
            required
            inputProps={{
              maxLength: 3,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
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
    </CurrencyConverterForm>
  );
};

export default CurrencyConverter;
