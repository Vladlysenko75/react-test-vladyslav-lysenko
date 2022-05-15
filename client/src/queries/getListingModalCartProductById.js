import {gql} from "apollo-boost";

export const MODAL_CART_PRODUCT = (id) => gql`
    {
        product(id: "${id}") {
            name
            prices {
                amount
                currency {
                    label
                    symbol
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