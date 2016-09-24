import React from "react";
var ReactSlider = require('react-slick');
import Slide from "./slide";

export default class Slider extends React.Component {
    constructor() {
        super();

        this.slideData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.dataToShow = [1, 2, 3];

        this.showDataIndex = 0;
        this.slideDataIndex = this.dataToShow.length;
        this.slidesToRender = 3;
        this.currentIndex = 0;

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

            beforeChange: (currentSlide, nextSlide) => {
                if(nextSlide >= currentSlide || (currentSlide === (this.dataToShow.length - 1) && nextSlide === 0))
                    this.currentIndex++;
                else if(nextSlide < currentSlide)
                    this.currentIndex--;
            },

            afterChange: (currentSlide) => {
                if(this.currentIndex > 1) {
                    this.dataToShow[this.showDataIndex] = this.slideData[this.slideDataIndex];
                    this.showDataIndex = (this.showDataIndex + 1) % this.dataToShow.length;
                    this.slideDataIndex = (this.slideDataIndex + 1) % this.slideData.length;
                    this.setState({slides: this.dataToShow});
                }
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
