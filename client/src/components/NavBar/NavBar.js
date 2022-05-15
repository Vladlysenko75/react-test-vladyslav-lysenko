import {Component} from 'react';

import {MContext} from '../../context/MContext';

import Currencies from './Currencies/Currencies';
import Categories from './Categories/Categories';
import shopLogo from '../../img/shopIcon.svg';
import MiniCart from './MiniCart/MiniCart';
import cart from '../../img/cart.svg';
import './NavBar.css';

class NavBar extends Component {

    render() {

        return (
            <MContext.Consumer>
                {(context) => {
                    const {state:{showMiniCart, currency, productsQuantity}, setCurrency, setShowMiniCart} = context;

                    return (
                        <div className="navBar">
                            <Categories context={context}/>
                            <div className="tools">
                                <div className="shopLogo">
                                    <img src={shopLogo} alt="Shop logo"/>
                                </div>
                                <div className="navBarOptions">
                                    <Currencies currency={currency} setCurrency={setCurrency}/>
                                    <div
                                        className="cartIcon"
                                        onClick={setShowMiniCart}
                                    >
                                        <img src={cart} alt="cart"/>
                                        {productsQuantity > 0 && (
                                            <div className="productQuantity">
                                                <p>{productsQuantity}</p>
                                            </div>
                                        )}
                                    </div>
                                    {showMiniCart && (
                                        <MiniCart context={context}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }}
            </MContext.Consumer>
        )
    }
}

export default NavBar;