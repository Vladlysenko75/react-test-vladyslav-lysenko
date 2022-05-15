import {Component} from 'react';

import {Query} from 'react-apollo';
import {CATEGORY_PRODUCTS} from '../../queries/getCategoryProducts';

import ListingCartModal from './ListingCartModal/ListingCartModal';
import ListingProduct from './ListingProduct/ListingProduct';
import {MContext} from '../../context/MContext';
import './ProductListingPage.css';

class ProductListingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultCategory: 'all'
        }
    }

    render() {
        const {match: {params: {category}}} = this.props;

        return (
            <MContext.Consumer>
                {(context) => {
                    const {state:{currency, showListingCartModal, cartModalProductId},
                        updateCartQuantity, setCartModalProductId, setShowListingCartModal, addProductToCart} = context;

                    return (
                        <Query query={CATEGORY_PRODUCTS( category)}>
                            {({loading, data, error}) => {
                                if (loading) return (<h2>Loading...</h2>);

                                if (error) return (<h2>{error.message}</h2>);

                                if (data) return (
                                    <div className="listing">
                                        <h1>{data.category.name.toUpperCase()}</h1>
                                        <div className="products">
                                            {data.category.products.map((product) => (
                                                <ListingProduct
                                                    key={product.id}
                                                    product={product}
                                                    currency={currency.label}
                                                    addProductToCart={addProductToCart}
                                                    updateCartQuantity={updateCartQuantity}
                                                    setCartModalProductId={setCartModalProductId}
                                                    setShowListingCartModal={setShowListingCartModal}
                                                />
                                            ))}
                                        </div>
                                        <ListingCartModal
                                            currency={currency.label}
                                            addProductToCart={addProductToCart}
                                            updateCartQuantity={updateCartQuantity}
                                            cartModalProductId={cartModalProductId}
                                            showListingCartModal={showListingCartModal}
                                            setShowListingCartModal={setShowListingCartModal}
                                        />
                                    </div>
                                )
                            }}
                        </Query>
                    )
                }}
            </MContext.Consumer>
        )
    }
}

export default ProductListingPage;