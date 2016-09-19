import React from "react";

export default class Slide extends React.Component {
    constructor() {
        super();
    }

    render() {
        let class_name = 'slide-' + this.props.counter;
        return (
            <div className={class_name}><h3>{this.props.counter}</h3></div>
        );
    }
};
