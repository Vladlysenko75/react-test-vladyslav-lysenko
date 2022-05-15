import {gql} from "apollo-boost";

export const PRODUCT_BY_ID = (id) => gql`
    {
        product(id: "${id}") {
            id
            name
            brand
            description
            gallery
            inStock
            prices {
                amount
                currency {
                    symbol
                    label
                }
            }
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`