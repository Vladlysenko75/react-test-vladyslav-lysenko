import {Component} from 'react';

import {Query} from 'react-apollo';
import HTMLReactParser from 'html-react-parser';
import {PRODUCT_BY_ID} from '../../queries/getProductById';

import ProductAttributes from './ProductAttributes/ProductAttributes';
import {MContext} from '../../context/MContext';

import './ProductDescriptionPage.css';

class ProductDescriptionPage extends Component {
    static contextType = MContext;

    constructor(props) {
        super(props);

        this.state = {
            bigImage: '',
        }

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(event, prices, id) {
        const {addProductToCart} = this.context;
        addProductToCart(event, prices, id);
    }

    render() {
        const {match:{params:{id}}} = this.props;
        const {state:{currency:{label}}, } = this.context;
        const {bigImage} = this.state;

        return (
            <Query query={PRODUCT_BY_ID(id)} fetchPolicy={'no-cache'}>
                {({loading, data, error}) => {
                    if (loading) return (<h3>Loading...</h3>);

                    if (error) return (<h3>{error.message}</h3>);

                    if (data) {
                        const {brand, name, description, gallery, prices, attributes, inStock} = data.product;
                        const properPrice = prices.find((price) => price.currency.label === label);
                        const {amount, currency:{symbol}} = properPrice;

                        return (
                            <div className="productDescriptionPage">
                                <div className="productImages">
                                    <div className="smallImages">
                                        {gallery.map((image) => (
                                            <img
                                                key={image}
                                                src={image}
                                                alt="small product"
                                                onClick={() => this.setState({bigImage: image})}/>
                                        ))}
                                    </div>
                                    <div className="bigImage">
                                        {bigImage ?
                                            <img src={bigImage} alt="big product"/> :
                                            <img src={gallery[0]} alt="big product"/>
                                        }
                                    </div>
                                </div>
                                <div className="productDescription">
                                    <h1>{brand}</h1>
                                    <h2>{name}</h2>
                                    <form onSubmit={(event) => this.addToCart(event, prices, id)}>
                                        {attributes && (attributes.map((attribute) =>
                                            <ProductAttributes key={attribute.id} attribute={attribute}/>
                                        ))}
                                        <h4>PRICE:</h4>
                                        <h3>{symbol} {amount}</h3>
                                        {inStock ?
                                            <button className="addToCartBtn">ADD TO CART</button> :
                                            <div className="outOfStockBanner">OUT OF STOCK</div>
                                        }
                                    </form>
                                    <div>{HTMLReactParser(description)}</div>
                                </div>
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default ProductDescriptionPage;