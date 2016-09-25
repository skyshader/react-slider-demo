import React from "react";
var ReactSlider = require('react-slick');
import Slide from "./slide";

export default class Slider extends React.Component {
    constructor() {
        super();

        this.dataToShow = [1, 2, 3];
        this.nextData = [4, 5, 6, 7, 8, 9, 10];
        this.prevData = [];

        this.slidesToRender = this.dataToShow.length;
        this.isNext = true;
        this.currentDataIndex = 0;

        this.state = {
            slides: this.dataToShow
        };

        this.settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: this.beforeChangeHandler.bind(this),
            afterChange: this.afterChangeHandler.bind(this)
        };
    }

    render() {
        return (
            <ReactSlider ref='slider' className='container' {...this.settings}>
                {
                    this.state.slides.map(function (slide) {
                        return <div key={slide}><Slide counter={slide}/></div>
                    })
                }
            </ReactSlider>
        );
    }

    beforeChangeHandler(currentSlide, nextSlide) {
        this.isNext = this.isNextSlide(currentSlide, nextSlide);
    }

    isNextSlide(currentSlide, nextSlide) {
        return (
            (nextSlide >= currentSlide && !(currentSlide === 0 && nextSlide === (this.dataToShow.length - 1))) ||
            (currentSlide === (this.dataToShow.length - 1) && nextSlide === 0)
        );
    }

    afterChangeHandler(currentSlide) {
        if(this.prevData.length === 0 && currentSlide === 1) return null;

        if (this.isNext && this.nextData.length) {
            this.prevData.unshift(this.dataToShow[this.currentDataIndex]);
            this.dataToShow[this.currentDataIndex] = this.nextData.shift();
            this.currentDataIndex = (this.currentDataIndex + 1) % this.slidesToRender;
        }
        if(!this.isNext && this.prevData.length) {
            if(this.currentDataIndex === 0) this.currentDataIndex = this.slidesToRender - 1;
            else this.currentDataIndex--;
            this.nextData.unshift(this.dataToShow[this.currentDataIndex]);
            this.dataToShow[this.currentDataIndex] = this.prevData.shift();
        }

        this.setState({slides: this.dataToShow});
        console.log(this.dataToShow, this.nextData, this.prevData);
    }
};
