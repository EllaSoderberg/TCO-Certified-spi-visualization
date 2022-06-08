import * as d3 from "d3";

export const getXScale = (axisNames, margin) => d3.scalePoint()
    .domain(axisNames)
    .rangerange([margin.left + axisSpacing / 2, width - margin.right - (width / axisNames.length) / 2]);


export const getYScales = (spiData, axisNames, margin, height) => {
    const y = new Map();

    axisNames.forEach(name => {
        if (name === "weight") {
            y.set(name, d3.scaleLinear().domain([spiData[name].MAX, 1]).range([margin.top, height - margin.bottom]))
        } else if (name === "ETEC_ratio") {
            y.set(name, d3.scaleLinear().domain([0, spiData[name].MAX]).range([margin.top, height - margin.bottom]))
        } else {
            y.set(name, d3.scaleLinear().domain([1, spiData[name].NC]).range([margin.top, height - margin.bottom]))
        }
    });
    return y;
}

export const drawAxes = (container, spiData, xScale, yScales, axisNames, labelMap, margin)