function ProductSquare(props) {
    let width = 100 / props.numberOfClasses;
    return (
        <div
            style={{ flexBasis: { width }, backgroundColor: `rgba(142, 151, 205, ${props.percentage})`, outlineOffset: `${props.outline ? "-3px" : "0px" }`}}
            className={`w-full h-full p-2 ${props.outline ? `outline` : "" }`}>
            <div className="flex flex-col text-left">
                {props.squareText}
            </div>
        </div>
    )
}
export default ProductSquare;