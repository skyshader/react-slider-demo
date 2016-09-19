import React from "react";
var ReactSlider = require('react-slick');
import Slide from "./slide";

export default class Slider extends React.Component {
    constructor() {
        super();

        this.slideData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.slidesToRender = 2;
        this.currentIndex = 0;
        this.state = {
            slides: this.slideData.slice(this.currentIndex, this.slidesToRender)
        };

        this.settings = {
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,

            beforeChange: (currentSlide, nextSlide) => {
                if(nextSlide >= currentSlide)
                    this.currentIndex++;
                else if(nextSlide < currentSlide)
                    this.currentIndex--;
            },

            afterChange: (currentSlide) => {
                let slides = this.slideData.slice(0, this.currentIndex + this.slidesToRender);
                this.setState({slides: slides});
            }
        };

    }

    render() {
        return (
            <ReactSlider ref='slider' className='container' {...this.settings}>
                {
                    this.state.slides.map(function (slide) {
                        return <div key={slide}><Slide counter={slide} /></div>
                    })
                }
            </ReactSlider>
        );
    }
};
