import {gql} from "apollo-boost";

export const CATEGORY_PRODUCTS = (category) => gql`
    {
        category(input: {title: "${category}"}) {
            name
            products {
                id
                brand
                name
                inStock
                gallery
                attributes {
                    id
                }
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
            }
        }
    }
`