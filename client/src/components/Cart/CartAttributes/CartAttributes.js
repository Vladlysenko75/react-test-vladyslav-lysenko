import {Component} from "react";

import './CartAttributes.css';

class CartAttributes extends Component {

    render() {
        const {attribute, cartAttributes} = this.props;

        const {id, name, items, type} = attribute;

        if (type === "text") return (
            <>
                <h4>{name}:</h4>
                <div key={id} className="selected">
                    {items.map(item => {

                        if (cartAttributes) {
                            const attributeKeyArray = Object.keys(cartAttributes);

                            const attributeMatch = attributeKeyArray.includes(id) && item.value === cartAttributes[id];
                            const attributeChecked = attributeMatch ? "checked" : "unChecked";

                            return (
                                <div className={attributeChecked} key={item.id}>
                                    <p>{item.value}</p>
                                </div>
                            )
                        }

                        return (
                            <h4>No attributes selected</h4>
                        )
                    })}
                </div>
            </>
        )

        if (type === "swatch") return (
            <>
                <h4>{name}:</h4>
                <div key={id} className="selectedColor">
                    {items.map(item => {
                        const {value, displayValue} = item;

                        if (cartAttributes) {
                            const attributeKeyArray = Object.keys(cartAttributes);

                            const colorMatch = attributeKeyArray.includes(id) && displayValue === cartAttributes[id];

                            const colorChecked = colorMatch ? "colorChecked" : "colorSwatch";

                            if (value === '#FFFFFF') {
                                return (
                                    <div key={item.id} className={colorChecked} style={{border: '1px solid black'}}/>
                                )
                            }

                            return (
                                <div key={item.id} className={colorChecked} style={{backgroundColor: value, border: `1px solid ${value}`}}/>
                            )
                        }

                        return (
                            <h4>No attributes selected</h4>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default CartAttributes;