import {Component} from 'react';

import BtnSlider from './BtnSlider';
import './Slider.css';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 1,
        }

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.moveDot = this.moveDot.bind(this);
    }

    nextSlide() {
        const {slideIndex} = this.state;
        const {gallery} = this.props;
        if(slideIndex !== gallery.length){
            this.setState(prev => ({slideIndex: prev.slideIndex + 1}))
        }
        else if (slideIndex === gallery.length) {
            this.setState({slideIndex: 1})
        }
    }

    prevSlide() {
        const {slideIndex} = this.state;
        const {gallery} = this.props;
        if(slideIndex !== 1){
            this.setState(prev => ({slideIndex: prev.slideIndex - 1}))
        }
        else if (slideIndex === 1){
            this.setState({slideIndex: gallery.length})
        }
    }

    moveDot(index) {
        this.setState({slideIndex: index})
    }

    render() {
        const {gallery} = this.props;
        const {slideIndex} = this.state;

        return (
            <div className="container-slider">
                {gallery.map((obj, index) => {

                    return (
                        <div
                            key={obj}
                            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <img
                                src={obj}
                                alt='product'
                            />
                        </div>
                    )
                })}
                <BtnSlider moveSlide={this.nextSlide} direction={"next"} />
                <BtnSlider moveSlide={this.prevSlide} direction={"prev"}/>
            </div>
        )
    }
}

export default Slider;