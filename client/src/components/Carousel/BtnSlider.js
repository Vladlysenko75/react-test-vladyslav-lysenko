import {Component} from "react";

import rightArrow from '../../img/pointerRight.svg';
import leftArrow from '../../img/pointerLeft.svg';
import './Slider.css';

class BtnSlider extends Component {

    render() {
        const {moveSlide, direction} = this.props;

        return (
            <div>
                <img
                    onClick={moveSlide}
                    className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
                    src={direction === "next" ? rightArrow : leftArrow} alt="product"
                />
            </div>
        )
    }
}

export default BtnSlider;