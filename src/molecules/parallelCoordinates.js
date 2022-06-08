import Plot from 'react-plotly.js';

export default function ParallelCoordinates(props) {
    let labels = ["A", "B", "C", "D", "E", "F", "G"];

    function randomSpacedInterval(min, max, count, spacing) {
        var available = max - min - spacing * (count - 1);
        if (available < 0) return false;
        var arr = [];
        for (var i = 0; i < count; i++) {
            var temp = Math.round(Math.random() * available);
            arr[i] = Math.round(((i === 0) ? min + temp : arr[i - 1] + temp + spacing) * 10) / 10;
            available -= temp;
        }
        return arr;
    }

    let data = {
        type: 'parcoords',
        name: "Woo",
        labelangle: -45,
        line: {
            color: props.productData.map((data) => data.brand),
            //colorscale: [[0, 'gray'], [0.40, 'gray'], [0.44, 'red'], [0.5, 'gray'], [1, 'gray']],

        },

        dimensions: [
            ...props.spiData.map((spi) => {
                let numerical = spi.NC === 10 ? true : false;
                return (
                    {
                        range: numerical ? [0, spi.MAX] : [spi.NC, 1],
                        label: spi.KEY,
                        name: spi.KEY,
                        text: spi.SPINAME,
                        values: [...props.productData.map((data) => data[spi.KEY])],
                        tickvals: numerical ? randomSpacedInterval(0, 1, 10, spi.MAX / spi.NC) : [...Array(spi.NC + 1).keys()].slice(1, spi.NC + 1),
                        ticktext: numerical ? randomSpacedInterval(0, 1, 10, spi.MAX / spi.NC) : labels.slice(0, spi.NC)
                    }
                )
            }), {
                range: [1, 8],
                label: "brands",
                values: props.productData.map((data) => data.brand),
            },
        ]
    }
    return (
        <div>
            <Plot
                data={[data]}
                layout={{ width: 1800 }}
                onHover={(data) => {
                    console.log(data)
                }}
            />
        </div>
    );
}