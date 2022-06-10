import React, { Component } from "react";
import GifCard from "../atoms/gifCard";
import ProductSquare from "../atoms/productSquare";
import XButton from "../atoms/xButton";
import gif from "../images/giphy.gif"

export default class InfoPopup extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.props.toggle();
    };

    render() {
        return (
            <div className="flex justify-center fixed w-screen h-screen top-0 left-0 overflow-auto">
                <div className="fixed w-full h-full top-0 left-0 bg-black opacity-40" onClick={this.handleClick}></div>
                <div className="absolute w-2/3 bg-white top-8 p-6">
                    <div className="flex justify-end">
                        <XButton handleClick={this.handleClick} />
                    </div>

                    <div className="flex flex-col text-left text-lg">
                    Welcome to the Sustainability Performance Indicator visualization. 
                       This tool can be used to filter and compare the SPIs of your products to the SPIs of your competitiors products.
                       The following functions can be used: 
                        <GifCard headline={"Brushing"} text={"You can filter the products by brushing over the axes"} gifLink={gif}/>
                        <GifCard headline={"Reordering"} text={"The axes can be reordered"} gifLink={gif}/>
                        <GifCard headline={"SPI info"} text={"To read more about each SPI you can click on the info button"} gifLink={gif}/>
                        <GifCard headline={"Class info"} text={"To learn what information a class corresponds to, you can hover over the class label."} gifLink={gif}/>
                    </div>
                </div>
            </div>
        );
    }
}