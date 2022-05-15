import {Component} from 'react';

import {Query} from 'react-apollo';
import {MINI_CART_PRODUCT} from '../../queries/getMiniCartProductById';

import CartAttributes from "./CartAttributes/CartAttributes";
import {TAX_PERCENTAGE} from "../../constants/constants";
import {MContext} from '../../context/MContext';
import Slider from '../Carousel/Slider';
import './Cart.css';

class Cart extends Component {

    render() {

        return (
            <MContext.Consumer>
                {(context) => {
                    const {state:{currency, cartProducts, totalPrice, productsQuantity},
                        increaseProductQuantity, decreaseProductQuantity} = context;

                    return (
                        <div className="cart">
                            <h1>CART</h1>
                            {cartProducts.length === 0 && (
                                <div className="emptyCart">
                                    <h2>Your cart is empty</h2>
                                    <h3>Add products to your cart to proceed payment.</h3>
                                </div>
                            )}
                            {cartProducts.map(product => {
                                const {id, cartAttributes, quantity, queryId} = product

                                return (
                                    <Query key={id} query={MINI_CART_PRODUCT(queryId)} fetchPolicy={'no-cache'}>
                                        {({data, loading, error}) => {
                                            if (loading) return (<h3>Loading...</h3>);

                                            if (error) return (<h3>{error.message}</h3>);

                                            if (data) {
                                                const {name, gallery, prices, brand, attributes} = data.product;
                                                const properPrice = prices.find(price =>
                                                    price.currency.label === currency.label
                                                );
                                                const {amount, currency:{symbol}} = properPrice;

                                                return (
                                                    <div>
                                                        <div className="cartProductLine"/>
                                                        <div className="cartProduct">
                                                            <div className="cartProductDescription">
                                                                <h2>{brand}</h2>
                                                                <h3>{name}</h3>
                                                                <h4>{symbol}{amount}</h4>
                                                                <div className="cartAttributes">
                                                                    {attributes && attributes.map((attribute) =>
                                                                        <CartAttributes
                                                                            key={attribute.id}
                                                                            attribute={attribute}
                                                                            cartAttributes={cartAttributes}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="cartImage">
                                                                <div className="CartQuantity">
                                                                    <div
                                                                        onClick={() => {
                                                                            increaseProductQuantity(id)
                                                                        }}
                                                                        className="cartQuantityBtn"
                                                                    >
                                                                        <p>+</p>
                                                                    </div>
                                                                    <div>{quantity}</div>
                                                                    <div
                                                                        onClick={() => {
                                                                            decreaseProductQuantity(id)
                                                                        }}
                                                                        className="cartQuantityBtn">
                                                                        <p>-</p>
                                                                    </div>
                                                                </div>
                                                                <div className="cartProductImages">
                                                                    {gallery.length > 1 ?
                                                                        <Slider key={id+Math.random() * 1000} gallery={gallery}/> :
                                                                        <img src={gallery[0]} alt="product"/>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }}
                                    </Query>
                                )
                            })}
                            {cartProducts.length > 0 && (
                                <>
                                    <div className="cartProductLine"/>
                                    <div className="total">
                                        <div className="totalInfo">
                                            <h5>Tax 21%:</h5>
                                            <h5>Quantity:</h5>
                                            <h4>Total:</h4>
                                        </div>
                                        <div className="totalNumbers">
                                            <h4>{currency.symbol}{(totalPrice * TAX_PERCENTAGE).toFixed(2)}</h4>
                                            <h4>{productsQuantity}</h4>
                                            <h4>{currency.symbol}{totalPrice.toFixed(2)}</h4>
                                        </div>
                                    </div>
                                    <div className="cartCheckOut">
                                        <div className="cartCheckOutBtn">
                                            <p>ORDER</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                }}
            </MContext.Consumer>
        )
    }
}

export default Cart;