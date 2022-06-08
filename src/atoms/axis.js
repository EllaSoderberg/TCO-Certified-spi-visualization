import React, { useMemo } from "react";
import * as d3 from 'd3';

export default function Axis({ axisLabels, domain, range }) {

    const ticks = useMemo(() => {
        const yScale = d3.scaleLinear()
            .domain(domain)
            .range(range)

        return yScale.ticks(axisLabels.length)
            .map(value => ({
                value,
                xOffset: yScale(value)
            }))
    }, [
        domain.join("-"),
        range.join("-")
    ])

    return (
        <svg>
            <path
                d={[
                    "M", range[0], 6,
                    "v", -6,
                    "H", range[1],
                    "v", 6,
                ].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            {ticks.map(({ value, xOffset }) => (
                <g
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                >
                    <line
                        y2="6"
                        stroke="currentColor"
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)"
                        }}>
                        {axisLabels[value-1]}
                    </text>
                </g>
            ))}
        </svg>
    );
};