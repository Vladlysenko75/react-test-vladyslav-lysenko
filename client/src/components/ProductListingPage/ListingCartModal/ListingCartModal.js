import {Component} from 'react';

import {Query} from 'react-apollo';
import {MODAL_CART_PRODUCT} from '../../../queries/getListingModalCartProductById';

import ProductAttributes from '../../ProductDescriptionPage/ProductAttributes/ProductAttributes';
import './ListingCartModal.css';

class ListingCartModal extends Component {
    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(event, prices, id, setShowListingCartModal, addProductToCart) {
        addProductToCart(event, prices, id);
        setShowListingCartModal();
    }

    render() {
        const {showListingCartModal, setShowListingCartModal, cartModalProductId, currency, addProductToCart} = this.props;

        return (
            <>
                {showListingCartModal && (
                    <div className="listingCartModal">
                        <div className="listingCartModalOverlay" onClick={setShowListingCartModal}/>
                        <div className="modalContent">
                            <div className="closeBtn">
                                <div className="listingCartModalBtn" onClick={setShowListingCartModal}>
                                    <p>X</p>
                                </div>
                            </div>
                            <Query query={MODAL_CART_PRODUCT(cartModalProductId)} fetchPolicy={'no-cache'}>
                                {({loading, error, data}) => {
                                    if (loading) return (<h3>Loading...</h3>);

                                    if (error) return (<h3>{error.message}</h3>);

                                    if (data) {
                                        const {attributes, name, prices} = data.product;
                                        const properPrice = prices.find((price) => price.currency.label === currency);
                                        const {amount, currency:{symbol}} = properPrice;

                                        return (
                                            <div className="listingCartModalForm">
                                                <h1>{name}</h1>
                                                <h4>{symbol} {amount}</h4>
                                                <form onSubmit={(event => this.addToCart(event, prices, cartModalProductId, setShowListingCartModal, addProductToCart))}>
                                                    {attributes.map(attribute => (
                                                        <ProductAttributes key={attribute.id} attribute={attribute}/>
                                                    ))}
                                                    <button className="addToCartBtn">ADD TO CART</button>
                                                </form>
                                            </div>
                                        )
                                    }
                                }}
                            </Query>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default ListingCartModal;