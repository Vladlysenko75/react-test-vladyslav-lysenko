import {gql} from "apollo-boost";

export const ALL_CATEGORIES = gql`
    {
        categories {
            name
        }
    }
`