import { useState } from "react";
import { AiOutlineDownSquare, AiOutlineUpSquare } from "react-icons/ai";


export default function TableHead(props) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        props.handleSorting(accessor, sortOrder);
    };

    return (
        <thead className="text-gray-700 text-xs uppercase bg-gray-50">
            <tr>
                {props.columns.map(({ label, accessor, sortable }) => {
                    return <th className="px-6 py-3 text-center cursor-pointer relative" scope="col" key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null}>
                        {label}<span className="absolute p-1 top-0">
                    {sortable
                        ? sortField && sortField === accessor && order === "asc"
                         ? <AiOutlineUpSquare/>
                         : sortField && sortField === accessor && order === "desc"
                         ? <AiOutlineDownSquare/>
                         : <AiOutlineUpSquare/>
                        : <AiOutlineUpSquare/>}</span></th>;
                })}
            </tr>
        </thead>
    );

};