import { gql } from "@apollo/client";

export const CONVERT_CURRENCY = gql`
  query ConvertCurrency($input: ConvertCurrencyInput!) {
    convertCurrency(input: $input)
  }
`;
