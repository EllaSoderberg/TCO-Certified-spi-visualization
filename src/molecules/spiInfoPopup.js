import React, { Component } from "react";
import ProductSquare from "../atoms/productSquare";
import XButton from "../atoms/xButton";

export default class SpiInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.props.toggle();
    };

    render() {
        let typeDescription = { "Y": "Always collected during product/testing/verification/application process", "X": "blabla" }
        let spi = this.props.spiData;
        console.log(spi);

        let keys = Object.keys(spi.CLASSDEF);
        let values = Object.values(spi.CLASSDEF);
        return (
            <div className="flex justify-center fixed w-screen h-screen top-0 left-0 overflow-auto">
                <div className="fixed w-full h-full top-0 left-0 bg-black opacity-40" onClick={this.handleClick}></div>
                <div className="absolute w-2/3 bg-white top-8 p-6">
                    <div className="flex flex-row justify-between">
                        <div className="text-2xl pt-6 font-bold">
                            {spi.SPINAME} {spi.CLASS ? `(${spi.CLASS})` : ""}
                        </div>
                        <XButton handleClick={this.handleClick} />
                    </div>

                    <div className="flex flex-col text-left text-lg">
                        <div><b>Chapter: </b> {spi.CHAPTER} </div>
                        <div><b>SPI type: </b>{spi.SPITYPE} ({typeDescription[spi.SPITYPE]})</div>
                        <br></br>
                        <div className="border-b border-black text-2xl">Description</div>
                        {spi.BACKGROUND ? <div><div className="font-bold">Background</div><div dangerouslySetInnerHTML={{ __html: spi.BACKGROUND }}></div></div> : ""}
                        {spi.DEFINITIONS ? <div><div className="font-bold list-disc">Definitions</div><div className="list-disc" dangerouslySetInnerHTML={{ __html: spi.DEFINITIONS }}></div></div> : ""}
                        {spi.APPLICABILITY ? <div><div className="font-bold">Applicability</div><div dangerouslySetInnerHTML={{ __html: spi.APPLICABILITY }}></div></div> : ""}
                        <br></br>
                        <div className="text-md font-bold border-b-2 border-black">Classes: </div>
                        <div>
                            <div className="flex flex-row w-full text-center">
                                {spi.CLASSDEF === "No classes" ? spi.CLASSDEF : keys.map((key, i) => <ProductSquare squareText={<div><div className="font-bold">{key}</div><div dangerouslySetInnerHTML={{ __html: values[i] }}></div></div>} />)}
                            </div>
                            {spi.CLASSDEF !== "No classes" ? "" : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}