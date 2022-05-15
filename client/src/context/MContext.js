import React, {Component} from 'react';

import {attributeFormHandler} from '../functions/attributeFormHandler';

export const MContext = React.createContext(undefined);

export class MyProvider extends Component {
    constructor(props) {
        super(props);

        this.countTotalPrice = this.countTotalPrice.bind(this);
    }

    state = {
        cartProducts: [],
        currency: {
            label: "USD",
            symbol: "$",
        },
        productsQuantity: 0,
        totalPrice: 0,
        showListingCartModal: false,
        showMiniCart: false,
        cartModalProductId: '',
    }

    componentDidMount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const lastAddedProduct = JSON.parse(localStorage.getItem('lastAddedProduct')) || {};
        const oneDay = Date.now() - lastAddedProduct.time < 86400000;

        if (oneDay) {
            this.setState({cartProducts: cart});
        }

        const quantity = cart.reduce(  function quantityCounter (sum, elem) {
            return sum + elem.quantity;
        }, 0);
        this.setState({productsQuantity: quantity});

        const currency = JSON.parse(localStorage.getItem('currency')) || {};
        if (currency.chosen) {
            this.setState({
                currency: {
                    label: currency.chosen.label,
                    symbol: currency.chosen.symbol,
                }
            });
        }

        if (quantity > 0) {
            cart.forEach(product => {
                const properPrice = product.prices.find(price => {
                    if (currency.chosen) {
                        return price.currency.label === currency.chosen.label
                    } else {
                        return price.currency.label === this.state.currency.label
                    }
                });

                const total = properPrice.amount * product.quantity;

                this.setState(prev => ({
                    totalPrice: prev.totalPrice + total
                }))
            })
        }
    }

    countTotalPrice(products, label) {
        this.setState({totalPrice: 0});

        products.forEach(product => {
            const properPrice = product.prices.find(price => {
                if (label) {
                    return price.currency.label === label
                } else {
                    return price.currency.label === this.state.currency.label
                }
            });

            const total = properPrice.amount * product.quantity;
            this.setState(prev => ({
            totalPrice: prev.totalPrice + total
            }))
        })
    }

    render() {
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    setCurrency: (value) => {
                        const currency = JSON.parse(localStorage.getItem('currency')) || {};
                        currency.chosen = {
                            label: value.label,
                            symbol: value.symbol,
                        }

                        localStorage.setItem('currency', JSON.stringify(currency));
                        this.setState({
                            currency: {
                                label: value.label,
                                symbol: value.symbol,
                            }
                        })

                        this.countTotalPrice(this.state.cartProducts, value.label);
                    },
                    addProductToCart: (event, prices, id) => {
                        const selectedAttributes =  event ? attributeFormHandler(event) : undefined;
                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const lastAddedProduct = JSON.parse(localStorage.getItem('lastAddedProduct')) || {};
                        const {cartProducts} = this.state;

                        const alreadyAddedProduct = cart.find(product => {
                            if (selectedAttributes) {
                                return product.id === id + selectedAttributes.join('-')
                            } else {
                                return product.id === id
                            }
                        });

                        if (alreadyAddedProduct) {
                            const index = cart.indexOf(alreadyAddedProduct);
                            cart[index].quantity += 1;
                            localStorage.setItem('cart', JSON.stringify(cart));
                            lastAddedProduct.time = Date.now();
                            localStorage.setItem('lastAddedProduct', JSON.stringify(lastAddedProduct));

                            cartProducts[index].quantity += 1;
                            this.setState(prev => ({
                                productsQuantity: prev.productsQuantity + 1,
                                cartProducts,
                            }));
                            return this.countTotalPrice(cartProducts);
                        } else {
                            if (event) {
                                const productForm = Array.from(event.target);
                                const productId = id + selectedAttributes.join('-');
                                const attributesObject = {};

                                productForm.filter(input => input.checked).forEach((attribute) => {
                                    attributesObject[attribute.name] = attribute.value;
                                })

                                attributesObject['productId'] = productId;

                                cart.push({id: id + selectedAttributes.join('-'), queryId: id, quantity: 1, prices: prices, cartAttributes: attributesObject});
                                localStorage.setItem('cart', JSON.stringify(cart));
                                lastAddedProduct.time = Date.now();
                                localStorage.setItem('lastAddedProduct', JSON.stringify(lastAddedProduct));

                                cartProducts.push({id: id + selectedAttributes.join('-'), queryId: id, quantity: 1, prices: prices, cartAttributes: attributesObject});
                                this.setState(prev => ({
                                    productsQuantity: prev.productsQuantity + 1,
                                    cartProducts,
                                }));
                                return this.countTotalPrice(cartProducts);
                            } else {
                                cart.push({id: id, queryId: id, quantity: 1, prices: prices});
                                localStorage.setItem('cart', JSON.stringify(cart));
                                lastAddedProduct.time = Date.now();
                                localStorage.setItem('lastAddedProduct', JSON.stringify(lastAddedProduct));

                                cartProducts.push({id: id, queryId: id, quantity: 1, prices: prices});
                                this.setState(prev => ({
                                    productsQuantity: prev.productsQuantity + 1,
                                    cartProducts,
                                }));
                                return this.countTotalPrice(cartProducts);
                            }
                        }
                    },
                    setShowListingCartModal: () => this.setState(prev => ({
                        showListingCartModal: !prev.showListingCartModal
                    })),
                    setShowMiniCart: () => this.setState(prev => ({
                        showMiniCart: !prev.showMiniCart
                    })),
                    hideMiniCart: () => {
                        if (this.state.showMiniCart) {
                            this.setState({showMiniCart: false})
                        }
                    },
                    setCartModalProductId: (id) => this.setState({
                        cartModalProductId: id,
                    }),
                    increaseProductQuantity: (id) => {
                        const lastAddedProduct = JSON.parse(localStorage.getItem('lastAddedProduct')) || {};
                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const {cartProducts} = this.state;

                        const selectedProduct = cartProducts.find(product => product.id === id);
                        const index = cartProducts.indexOf(selectedProduct);

                        cartProducts[index].quantity += 1;
                        this.setState(prev => ({
                            productsQuantity: prev.productsQuantity + 1,
                            cartProducts,
                        }));

                        cart[index].quantity += 1;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        lastAddedProduct.time = Date.now();
                        localStorage.setItem('lastAddedProduct', JSON.stringify(lastAddedProduct));

                        this.countTotalPrice(cartProducts);
                    },
                    decreaseProductQuantity: (id) => {
                        const lastAddedProduct = JSON.parse(localStorage.getItem('lastAddedProduct')) || {};
                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const {cartProducts} = this.state;

                        const selectedProduct = cartProducts.find(product => product.id === id);
                        const index = cartProducts.indexOf(selectedProduct);

                        if (cartProducts[index].quantity !== 1) {
                            cartProducts[index].quantity -= 1;
                            this.setState(prev => ({
                                productsQuantity: prev.productsQuantity - 1,
                                cartProducts,
                            }));

                            cart[index].quantity -= 1;
                            localStorage.setItem('cart', JSON.stringify(cart));
                        } else {
                            const deletedProducts = cart.filter(product => product.id !== cart[index].id);
                            localStorage.setItem('cart', JSON.stringify(deletedProducts));

                            const filteredProducts = cartProducts.filter(product => product.id !== cartProducts[index].id);
                            this.setState(prev => ({
                                productsQuantity: prev.productsQuantity - 1,
                                cartProducts: filteredProducts,
                            }));
                        }

                        lastAddedProduct.time = Date.now();
                        localStorage.setItem('lastAddedProduct', JSON.stringify(lastAddedProduct));
                        this.countTotalPrice(cartProducts);
                    },
                }}>
                {this.props.children}
            </MContext.Provider>)
    }
}