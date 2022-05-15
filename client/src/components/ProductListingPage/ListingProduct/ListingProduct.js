import {Component} from 'react';
import {Link} from 'react-router-dom';

import whiteCart from '../../../img/whiteCart.svg';
import './ListingProduct.css';

class ListingProduct extends Component {
    constructor(props) {
        super(props);

        this.cartModal = this.cartModal.bind(this);
    }

    cartModal(id, attributes, prices) {
        const {setShowListingCartModal, setCartModalProductId, addProductToCart} = this.props;

        if (attributes.length) {
            setShowListingCartModal();
            setCartModalProductId(id);
        } else {
            addProductToCart(undefined, prices, id);
        }
    }

    render() {
        const {gallery, brand, name, prices, inStock, id, attributes} = this.props.product;

        const properPrice = prices.find((price) => price.currency.label === this.props.currency);
        const {currency: {symbol}, amount} = properPrice;

        const product = inStock ? "product" : "product outOfStock";

        return (
            <div className={product}>
                <Link to={`/product/${id}`}>
                {!inStock && (
                    <div className="inStock"><h3>OUT OF STOCK</h3></div>
                )}
                    <img src={gallery[0]} alt="product"/>
                </Link>
                {inStock && (
                    <div className="listingProductCartBtn" onClick={() => this.cartModal(id , attributes, prices)}>
                        <img src={whiteCart} alt="add to cart"/>
                    </div>
                )}
                <p>{brand} {name}</p>
                <h4>{symbol} {amount}</h4>
            </div>
        )
    }
}

export default ListingProduct;