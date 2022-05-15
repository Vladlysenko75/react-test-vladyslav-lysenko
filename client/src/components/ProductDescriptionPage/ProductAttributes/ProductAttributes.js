import {Component} from 'react';

import './ProductAttributes.css';

class ProductAttributes extends Component {

    render() {
        const {attribute: {id, name, type, items}, cartAttributes} = this.props;

        if (type === "text") return (
            <div key={id}>
                <h4>{name.toUpperCase()}:</h4>
                <div className="attributes">
                    {items.map((item) => {
                        if (cartAttributes) {

                            const attributeKeyArray = Object.keys(cartAttributes);

                            if (attributeKeyArray.includes(id) && cartAttributes[id] === item.value) {
                                return (
                                    <div key={item.id} className="attributesInputs">
                                        <input checked={true} readOnly type="radio" className="attributesInput" id={item.id+id} value={item.value} name={name}/>
                                        <label className="attributesLabel" htmlFor={item.id+id}>
                                            {item.value}
                                        </label>
                                    </div>
                                )
                            }
                        }


                        return (
                            <div key={item.id} className="attributesInputs">
                                <input required type="radio" className="attributesInput" id={item.id+id} value={item.value} name={name}/>
                                <label className="attributesLabel" htmlFor={item.id+id}>
                                    {item.value}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

        if (type === "swatch") return (
            <>
                <h4>{name.toUpperCase()}:</h4>
                <div className="swatchAttributes">
                    {items.map((item) => {
                        const {id, displayValue, value} = item;

                        if (value === '#FFFFFF') {

                            return (
                                <div className="colorForm" key={id}>
                                    <input className="colorInput" required type="radio" id={id} value={displayValue} name={name}/>
                                    <label className="colorLabel" htmlFor={id} style={{backgroundColor: `${value}`, border: '1px solid black'}} />
                                </div>
                            )
                        }

                        return (
                            <div className="colorForm" key={id}>
                                <input className="colorInput" required type="radio" id={id} value={displayValue} name={name}/>
                                <label className="colorLabel" htmlFor={id} style={{backgroundColor: `${value}`}} />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default ProductAttributes;