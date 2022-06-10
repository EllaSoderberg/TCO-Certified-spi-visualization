import React from 'react';

import productdata from './data/productdata.json';
import productdatalabels from './data/productdata_labels.json';
import spidict from "./data/SPI_dict.json";
import spidata from "./data/SPI_aggregated.json"
import productAgg from "./data/product_agg.json"

import branddata from "./data/brand_aggregated.json";
import ParaCoordPlot from './molecules/paraCoordPlot';
import SpiInfoPopup from './molecules/spiInfoPopup';
import InfoPopup from './molecules/infoPopup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      popupSpi: "",
      infoPopup: true
    };
    this.togglePop = this.togglePop.bind(this);
    this.toggleInfoPop = this.toggleInfoPop.bind(this);

  }

  togglePop(spiName) {
    this.setState(prevState => ({
      popup: !prevState.popup,
      popupSpi: spiName
    }));
  };

  toggleInfoPop() {
    this.setState(prevState => ({
      infoPopup: !prevState.infoPopup
    }));
  };

  render() {
    return (
      <div>
        <div className='text-4xl text-center p-6'>Sustainability Performance Indicator visualization</div>
       <ParaCoordPlot productData={productdata} spiData={spidict} productLabels={productdatalabels} productAgg={productAgg} toggle={this.togglePop} toggleInfo={this.toggleInfoPop}></ParaCoordPlot>
       {this.state.popup ? <SpiInfoPopup spiData={spidict[this.state.popupSpi]} toggle={this.togglePop} /> : null}
       {this.state.infoPopup ? <InfoPopup toggle={this.toggleInfoPop} /> : null}
       <div className="flex justify-center fixed bottom-0 w-11/12 h-10 rounded-md m-4 shadow-md -z-10">Developed in 2022 by Ella Söderberg for TCO Development. Find me on&nbsp;<a href="https://github.com/EllaSoderberg" target="_blank" rel="noreferrer">Github</a>&nbsp;or&nbsp;<a href="https://www.linkedin.com/in/ella-s%C3%B6derberg/" target="_blank" rel="noreferrer">LinkedIn</a>.</div>
      </div>
    );
  }
}