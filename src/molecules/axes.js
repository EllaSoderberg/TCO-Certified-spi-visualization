/*import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import useWindowDimensions from "../hooks/useWindowDimensions";
import Table from "./table";

export default function Axes(props) {
    const [selectedData, setSelectedData] = useState([]);
    const [highlightedPath, setHighlightedPath] = useState("");

    const svgRef = React.useRef(null);

    let margin = { top: 50, right: 10, bottom: 10, left: 10 };
    let { height, width } = useWindowDimensions();
    width = width - margin.left - margin.right;
    height = height / 2 - margin.top - margin.bottom;

    let selectedColor = "red"
    let unselectedColor = "green"
    let brushWidth = 30

    let labelMap = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G" }

    useEffect(() => {

        // Create root container where we will append all other chart elements
        const svgEl = d3.select(props.svgRef);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 

        let svg = svgEl.append("g");
        let spi = props.spiData;

        const brush = d3.brushY()
            .extent([
                [-(brushWidth / 2), margin.top],
                [brushWidth / 2, height - margin.bottom]
            ])
            .on("start brush end", brushed);

        let axisNames = Object.keys(spi);

        // create the x-scale for the axes
        const axisSpacing = width / axisNames.length;
        const x = d3.scalePoint()
            .domain(axisNames)
            .range([margin.left + axisSpacing / 2, width - margin.right - axisSpacing / 2]);

        // create the y-scale for each axis
        const y = new Map();

        axisNames.forEach(name => {
            if (name === "weight") {
                y.set(name, d3.scaleLinear().domain([spi[name].MAX, 1]).range([margin.top, height - margin.bottom]))
            } else if (name === "ETEC_ratio") {
                y.set(name, d3.scaleLinear().domain([0, spi[name].MAX]).range([margin.top, height - margin.bottom]))
            } else {
                y.set(name, d3.scaleLinear().domain([1, spi[name].NC]).range([margin.top, height - margin.bottom]))
            }
        });

        // draw axes
        svg.append("g")
            .selectAll("g")
            .data(axisNames)
            .join("g")
            .attr("transform", d => `translate(${x(d)}, 0)`)
            .each(function (d) {
                d3.select(this)
                    .call(d3.axisLeft(y.get(d))
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
            .call(g => g.append("text")
                .attr("y", margin.top - 10)
                .attr("x", 15)
                .attr("text-anchor", 'middle')
                .attr("font-weight", "bold")
                .attr("fill", '#000')
                .text(d => d))
            .call(g => g.selectAll("text")
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke-width", 5)
                .attr("stroke-linejoin", "round")
                .attr("stroke", "white"))
            .call(brush);

        const selections = new Map();
        // brushing function for each axis
        function brushed({ selection }, axisName) {
            if (selection === null) {
                selections.delete(axisName);
            } else {
                selections.set(axisName, selection.map(y.get(axisName).invert));
            }
            const selected = [];
            path.each(function (d) {
                const active = Array.from(selections).every(([axisName, [min, max]]) => d[axisName] >= min && d[axisName] <= max);
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

    }, [])

    return (
        <div>
            <svg ref={svgRef} width={width} height={height} />
            <Table data={selectedData} onSelect={modelname => setHighlightedPath(modelname)} />
        </div>
    );
}*/