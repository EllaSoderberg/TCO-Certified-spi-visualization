import React from 'react';

import productdata from './data/productdata.json';
import productdatalabels from './data/productdata_labels.json';
import spidict from "./data/SPI_dict.json";
import spidata from "./data/SPI_aggregated.json"
import productAgg from "./data/product_agg.json"

import branddata from "./data/brand_aggregated.json";
import ParallelCoordinates from './molecules/parallelCoordinates';
import ParaCoords from './molecules/paraCoords';
import ParaCoordPlot from './molecules/paraCoordPlot';
import SpiInfoPopup from './molecules/spiInfoPopup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      popupSpi: ""
    };
    this.togglePop = this.togglePop.bind(this);
  }

  togglePop(spiName) {
    this.setState(prevState => ({
      popup: !prevState.popup,
      popupSpi: spiName
    }));
  };

  render() {
    return (
      <div>
        <div className='text-4xl text-center p-6'>Sustainability Performance Indicator visualization</div>
       <ParaCoordPlot productData={productdata} spiData={spidict} productLabels={productdatalabels} productAgg={productAgg} toggle={this.togglePop}></ParaCoordPlot>
       {this.state.popup ? <SpiInfoPopup spiData={spidict[this.state.popupSpi]} toggle={this.togglePop} /> : null}
         {/*<ParaCoords productData={productdata} spiData={spidict} productLabels={productdatalabels}></ParaCoords>*/}
        {/*<ParallelCoordinates productData={productdata} spiData={spidata} brandData={branddata} />*/}
      </div>
    );
  }
}