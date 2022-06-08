import React, { useEffect, useState, useRef, useMemo } from "react";
import * as d3 from 'd3';
import useWindowDimensions from "../hooks/useWindowDimensions";
import Table from "./table";

export default function ParaCoords(props) {
    //Set states
    const [highlightedPath, setHighlightedPath] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [showBars, setShowBars] = useState(true);
    const [showInactive, setShowInactive] = useState(true);
    const [rerender, setRerender] = useState(true);


    //Store data in variables
    let spi = props.spiData;
    let data = props.productData;
    let productAgg = props.productAgg;

    //Create refs (will not make the component rerender)
    const axisNames = useRef(Object.keys(spi));
    const svgRef = useRef(null);
    const brushSelections = useRef(new Map());

    //Set styling rules
    let margin = { top: 60, right: 20, bottom: 30, left: 20 };
    let { height, width } = useWindowDimensions();
    width = width - margin.right;
    height = height / 2 - margin.top - margin.bottom;
    let selectedColor = "#33a02c"
    let unselectedColor = "#b2df8a"
    let brushWidth = 20
    const axisSpacing = width / axisNames.current.length;
    let labelMap = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G" }

    //Create y-axes
    const y = useMemo(() => {
        const yTemp = new Map();
        axisNames.current.forEach(name => {
            if (name === "weight") {
                yTemp.set(name, d3.scaleLinear().domain([spi[name].MAX, 1]).range([margin.top, height - margin.bottom]))
            } else if (name === "ETEC_ratio") {
                yTemp.set(name, d3.scaleLinear().domain([0, spi[name].MAX]).range([margin.top, height - margin.bottom]))
            } else {
                yTemp.set(name, d3.scaleLinear().domain([1, spi[name].NC]).range([margin.top, height - margin.bottom]))
            }
        })
        return yTemp;
    }
    );

    //Create x-axis according to the axisNames order
    let x = d3.scalePoint()
        .domain(axisNames.current)
        .range([margin.left + axisSpacing / 2, width - margin.right - axisSpacing / 2]);

    //Create barplot-x-axes
    const xMini = d3.scaleLinear()
        .domain([0, 100])
        .range([0, axisSpacing / 2]);

    let rectangles = new Map();

    useEffect(() => {
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll(".bars").remove();
        svgEl.selectAll(".xMiniScale").remove();
        let svg = svgEl.select("g");

        if (showBars) {
            axisNames.current.forEach((axis) => {
                let keys = Object.keys(productAgg[axis]).map(key => parseFloat(key));
                let values = Object.values(productAgg[axis]);
                rectangles.set(axis, svg.selectAll("myRect")
                    .data(keys)
                    .enter()
                    .append("rect")
                    .attr("class", "bars")
                    .attr("x", x(axis))
                    .attr("y", key => y.get(axis)(key) - 5)
                    .attr("width", (key, i) => xMini(values[i]))
                    .attr("height", 10)
                    .attr("fill", "lightgray"));
                svg
                    .append("g")
                    .attr("class", "xMiniScale")
                    .attr("transform", `translate(${x(axis)}, ${height - margin.bottom + 5})`)
                    .call(d3.axisBottom(xMini)
                        .ticks(2))
            });
        }



    }, [width, height, showBars])


    useEffect(() => {
        //Select the SVG
        const svgEl = d3.select(svgRef.current);
        // Clear svg content before adding new elements
        svgEl.selectAll(".axes").remove();
        svgEl.selectAll(".path").remove();
        svgEl.selectAll(".axisText").remove();
        let svg = svgEl.append("g");

        //Empty the list of selected data
        setSelectedData([]);

        //Brushing function for y-axes
        const brush = d3.brushY()
            .extent([
                [-(brushWidth / 2), margin.top],
                [brushWidth / 2, height - margin.bottom]
            ])
            .on("start brush end", brushed);

        x = d3.scalePoint()
            .domain(axisNames.current)
            .range([margin.left + axisSpacing / 2, width - margin.right - axisSpacing / 2]);

        // the line function
        const line = d3.line()
            .defined(([, value]) => value != null)
            .x(([axisName]) => x(axisName))
            .y(([axisName, value]) => y.get(axisName)(value));

        let inactivePaths = svg.append("g")
        if (showInactive) {
            inactivePaths
                .attr("class", "path")
                .attr("fill", "none")
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 0.4)
                .selectAll("path")
                .data(data.filter((data) => data.brand !== 4))
                .join("path")
                .attr("stroke", "gray")
                .attr("d", d => line(d3.cross(axisNames.current, [d], (axisName, d) => [axisName, d[axisName]])));
        }

        // draw lines 
        let path = svg.append("g")
            .attr("class", "path")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 0.4)
            .selectAll("path")
            .data(data.filter((data) => data.brand === 4))
            .join("path")
            .attr("stroke", unselectedColor)
            .attr("d", d => line(d3.cross(axisNames.current, [d], (axisName, d) => [axisName, d[axisName]])));

        let dragging = {};

        // draw axes
        svg.append("g")
            .attr("class", "axes")
            .selectAll("g")
            .data(axisNames.current)
            .join("g")
            .attr("transform", d => `translate(${x(d)}, 0)`)
            .each(function (d) { //For each axis...
                d3.select(this) //Select the axis
                    .attr("class", "yAxis")
                    .call(d3.axisLeft(y.get(d)) //Apply the function to create an axis with left ticks
                        .ticks(spi[d].NC - 1)
                        .tickFormat((label) => {
                            if (d === "weight" || d === "ETEC_ratio") {
                                return label;
                            } else {
                                return "Class " + labelMap[label];
                            }
                        })
                    )
            })
            //Function to each a title text to each axis
            .call(g => g.append("text")
                .attr("class", "axisText")
                .attr("y", 25)
                .attr("x", 0)
                .attr("text-anchor", 'middle')
                .attr("font-weight", "bold")
                .attr("fill", '#000')
                //.attr("textLength", 50)
                //.attr("transform", `rotate(-10)`)
                .style("cursor", "move")
                .text(d => spi[d].SPINAMESHORT)
                .call(wrap, 120)
                //For each title text, a drag function is attached
                .call(d3.drag()
                    .on("start", function (event, name) {
                        //Set the starting position for an axis for the drag    
                        dragging[name] = x(name);
                    })
                    .on("drag", function (event, name) {
                        //Function to ensure data points "stretch" when an axis is moved
                        const stretch = d3.line()
                            .defined(([, value]) => value != null)
                            .x(([axisName]) => position(axisName))
                            .y(([axisName, value]) => y.get(axisName)(value));

                        //Calculate the exact position for an axis during the drag    
                        dragging[name] = Math.min(width, Math.max(0, event.x));

                        //Sort the axes during the drag according to their new position
                        axisNames.current.sort(function (a, b) { return position(a) - position(b); });
                        //Set the x axis domain to the new order
                        x.domain(axisNames.current);

                        //Move the axis with the arrow
                        g.attr("transform", axis => "translate(" + position(axis) + ")");
                        //Move the paths (both active and inactive) with the arrow
                        path.attr("d", data => stretch(d3.cross(axisNames.current, [data], (axisName, d) => [axisName, d[axisName]])));
                        if (showInactive) { inactivePaths.attr("d", data => stretch(d3.cross(axisNames.current, [data], (axisName, d) => [axisName, d[axisName]]))) };
                        //Move the bars with the arrow
                        axisNames.current.forEach(axis => rectangles.get(axis).attr("x", position(axis)));

                    })
                    .on("end", function (event, d) {
                        //Remove all dragged positions
                        delete dragging[d];
                        //Move the axis to the final position, with animation
                        transition(g).attr("transform", axis => "translate(" + x(axis) + ")");
                        //Move paths to the final position, with animation
                        if (showInactive) { transition(inactivePaths).attr("d", d => line(d3.cross(axisNames.current, [d], (axisName, d) => [axisName, d[axisName]]))) };
                        transition(path).attr("d", d => line(d3.cross(axisNames.current, [d], (axisName, d) => [axisName, d[axisName]])))
                        //Move bars to the final position, with animation
                        axisNames.current.forEach(axis => transition(rectangles.get(axis)).attr("x", x(axis)));

                    })
                    //Ensures that drag is relative to the whole container
                    .container(g))
                .on('click', (event, name) => props.toggle(name))
            )
            //Add another text element that creates a white background behind the black text
            .call(g => g.selectAll("text")
                .attr("class", "axisText")
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke-width", 5)
                .attr("stroke-linejoin", "round")
                .attr("stroke", "white"))
            //Add brushing functionality to each axis
            .call(brush);

        //Helper functions for drag
        function position(d) {
            var v = dragging[d];
            return v == null ? x(d) : v;
        }

        function transition(g) {
            return g.transition().duration(500);
        }

        // brushing function for each axis
        function brushed({ selection }, axisName) {
            if (selection === null) {
                brushSelections.current.delete(axisName);
            } else {
                brushSelections.current.set(axisName, selection.map(y.get(axisName).invert));
            }
            let selected = [];
            path.each(function (d) {
                let active = Array.from(brushSelections.current).every(([axisName, [min, max]]) => axisName === "weight" ? d[axisName] <= min && d[axisName] >= max : d[axisName] >= min && d[axisName] <= max);
                d3.select(this)
                    .style("stroke", active ? selectedColor : unselectedColor)
                    .style("stroke-opacity", active ? 1 : 0.4);
                if (active) {
                    d3.select(this).raise();
                    selected.push(d);
                }
            });
            svg.property("value", selected).dispatch("input");
            setSelectedData(selected);
        }

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = 0, //parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }

        const Tooltip = d3.select("#tooltip");

        let mouseover = function (event) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("cursor", "default")
        }
        let mousemove = function (event) {
            let axis = event.path[2].__data__;
            let classname = event.srcElement.innerHTML;
            let numerical = axis === "weight" || axis === "ETEC_ratio";
            let descriptions = numerical ? false : spi[axis].CLASSDEF;
            let bounds = event.target.getBoundingClientRect();

            let width = numerical ? 30 : Math.max(55, Math.min(descriptions[classname].length * 7, 200));

            Tooltip
                .html(numerical ? classname : descriptions[classname])
                .style("left", bounds.left - width - 5 + "px")
                .style("top", bounds.top - 10 + "px")
                .style("width", width + "px")
                .style("opacity", 1)

        }
        let mouseleave = function (event) {
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
        }

        d3.selectAll(".tick")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

    }, [width, height, rerender, showInactive])

    useEffect(() => {
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll(".highlightedpath").remove();
        let svg = svgEl.append("g");

        x = d3.scalePoint()
            .domain(axisNames.current)
            .range([margin.left + axisSpacing / 2, width - margin.right - axisSpacing / 2]);

        // the line function
        const line = d3.line()
            .defined(([, value]) => value != null)
            .x(([axisName]) => x(axisName))
            .y(([axisName, value]) => y.get(axisName)(value));

        svg.append("g")
            .attr("class", "highlightedpath")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 1)
            .selectAll("path")
            .data(data.filter((data) => data.modelname === highlightedPath))
            .join("path")
            .attr("stroke", "red")
            .attr("d", d => line(d3.cross(axisNames.current, [d], (axisName, d) => [axisName, d[axisName]])));

        d3.select(".highlightedpath").raise()

    }, [highlightedPath, width, height])

    return (
        <div>
            <div id="tooltip" className="absolute h-auto text-left text-xs p-2 bg-white opacity-0 shadow-md rounded-sm z-50"></div>
            <svg ref={svgRef} width={width} height={height}>
                <g className="container" />
            </svg>
            <div className="flex flex-row justify-evenly">
                <div className="text-center w-1/2">There are a total of {data.length} certified displays. Your brand has {data.filter((data) => data.brand === 4).length} certified displays. {selectedData.length} models are highlighted and shown in the table.</div>
                {/*<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={e => { setShowInactive(!showInactive); console.log(showInactive) }}>Show all models</button>*/}
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={e =>  setShowBars(!showBars)}>{showBars ? "Hide" : "Show"} distributions</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={e => { setRerender(!rerender); brushSelections.current.clear(); setSelectedData([]); }}>Reset filters</button>
            </div>
            <div className="flex justify-center">
                <Table data={selectedData} onSelect={modelname => setHighlightedPath(modelname)} />
            </div>
        </div>

    );
}