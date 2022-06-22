import React, { Component } from "react";
import GifCard from "../atoms/gifCard";
import XButton from "../atoms/xButton";
import brushingGif from "../images/brushing.gif";
import reorderingGif from "../images/reordering.gif";
import classInfoGif from "../images/labelinfo.gif";
import spiInfoGif from "../images/information.gif";


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
                <div className="absolute w-2/3 bg-white top-8 p-8">
                    <div className="flex justify-between">
                        <div className="text-4xl p-6">Getting started</div>
                        <XButton handleClick={this.handleClick} />
                    </div>

                    <div className="flex flex-col text-left text-lg px-6">
                        <div>
                            Welcome to the Sustainability Performance Indicator visualization.
                            This tool can be used to filter and compare the SPIs of your products to the SPIs of your competitiors products.
                            <br/>
                            <br/>
                            The following functions can be used:
                        </div>
                        <GifCard headline={"Brushing"} text={"You can filter the products by brushing over the axes."} gifLink={brushingGif} />
                        <GifCard headline={"Reordering"} text={"The axes can be reordered."} gifLink={reorderingGif} />
                        <GifCard headline={"SPI-info"} text={"To read more about each SPI you can click on the info button."} gifLink={spiInfoGif} />
                        <GifCard headline={"Class-info"} text={"To learn what information a class corresponds to, you can hover over the class label."} gifLink={classInfoGif} />
                    </div>
                </div>
            </div>
        );
    }
}