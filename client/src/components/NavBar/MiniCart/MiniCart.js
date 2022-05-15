import {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';
import {MINI_CART_PRODUCT} from '../../../queries/getMiniCartProductById';

import CartAttributes from "../../Cart/CartAttributes/CartAttributes";
import './MiniCart.css';

class MiniCart extends Component {

    render() {
        const {state:{currency, cartProducts, productsQuantity, totalPrice}, setShowMiniCart, increaseProductQuantity, decreaseProductQuantity} = this.props.context;


        return (
            <div className="miniCart">
                <div className="miniCartOverlay" onClick={setShowMiniCart}/>
                <div className="miniCartContent">
                    <div className="myBag">
                        <h4>My Bag, {productsQuantity || '0'}</h4>
                        <p>items</p>
                    </div>
                    <div className="miniCartHidden"/>
                    <div className="miniCartScroll">
                        {productsQuantity === 0  && (
                            <div className="emptyMiniCart">
                                <h4>Your cart is empty</h4>
                                <h5>Add products to your cart to proceed payment</h5>
                            </div>
                        )}
                        {productsQuantity > 0 && cartProducts.map((product) => {
                            const {id, quantity, queryId, cartAttributes} = product;

                            return (
                                <Query key={id} query={MINI_CART_PRODUCT(queryId)} fetchPolicy={'no-cache'}>
                                    {({loading, data, error}) => {
                                        if (loading) return (<h3>Loading...</h3>);

                                        if (error) return (<h3>{error.message}</h3>);

                                        if (data) {
                                            const {brand, name, gallery, prices, attributes} = data.product;

                                            const properPrice = prices.find(price => price.currency.label === currency.label);
                                            const {amount, currency:{symbol}} = properPrice;

                                            return (
                                                <div className="miniCartProducts">
                                                    <div className="miniCartDescription">
                                                        <div>
                                                            <h3>{brand}</h3>
                                                            <h3>{name}</h3>
                                                            <h4>{symbol} {amount}</h4>
                                                        </div>
                                                        <div className="miniCartAttributes">
                                                            {attributes && attributes.map((attribute) =>
                                                                <CartAttributes
                                                                    key={attribute.id}
                                                                    attribute={attribute}
                                                                    cartAttributes={cartAttributes}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="miniCartQuantity">
                                                        <div
                                                            onClick={() => increaseProductQuantity(id)}
                                                            className="miniCartQuantityBtn"
                                                        >
                                                            +
                                                        </div>
                                                        <p>{quantity}</p>
                                                        <div
                                                            onClick={() => decreaseProductQuantity(id)}
                                                            className="miniCartQuantityBtn"
                                                        >
                                                            -
                                                        </div>
                                                    </div>
                                                    <div className="miniCartImage">
                                                        <img src={gallery[0]} alt="product"/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }}
                                </Query>
                            )
                        })}
                    </div>
                    {productsQuantity > 0 && (
                        <>
                            <div className="miniCartTotalPrice">
                                <h4>Total</h4>
                                <h4>{currency.symbol}{totalPrice.toFixed(2)}</h4>
                            </div>
                            <div className="miniCartBtn">
                                <Link to={'/cart'}>
                                    <div onClick={setShowMiniCart} className="viewBag"><p>VIEW BAG</p></div>
                                </Link>
                                <div className="checkOut"><p>CHECK OUT</p></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default MiniCart;