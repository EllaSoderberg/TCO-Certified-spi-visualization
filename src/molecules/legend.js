export default function Legend({ colors, data, selectedData }) {
    return (
        <div className="shadow-md p-5">
            <div>Total products shown: {data.length}</div>
            <div className="flex flex-row">
                <div className="w-14 h-1 m-3 self-center " style={{ backgroundColor: colors.inactiveColor }}></div>
                <div>Products of other brands ({data.filter((data) => data.brand !== 4).length})</div>
            </div>
            <div className="flex flex-row">
                <div className="w-14 h-1 m-3 self-center" style={{ backgroundColor: colors.unselectedColor }}></div>
                <div>Products of your brand ({data.filter((data) => data.brand === 4).length})</div>
            </div>
            <div className="flex flex-row">
                <div className="w-14 h-1 m-3 self-center" style={{ backgroundColor: colors.selectedColor }}></div>
                <div>Selected products ({selectedData.length})</div>
            </div>
            <div className="flex flex-row">
                <div className="w-14 h-1 m-3 self-center" style={{ backgroundColor: colors.hightlightColor }}></div>
                <div>Highlighted product</div>
            </div>
        </div>

    )
} 