import {gql} from "apollo-boost";

export const ALL_CURRENCIES = gql`
    {
        currencies {
            label
            symbol
        }
    }
`