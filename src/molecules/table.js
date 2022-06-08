import { useState, useEffect } from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import productData from "../data/productdata.json"

export default function Table(props) {
    const [tableData, setTableData] = useState(productData);

    useEffect(() => {
        if (props.data.length === 0) {
            setTableData(productData.filter((data) => data.brand === 4));
        } else {
            setTableData(props.data);
        }
    }, [props.data]);

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
             if (a[sortField] === null) return 1;
             if (b[sortField] === null) return -1;
             if (a[sortField] === null && b[sortField] === null) return 0;
             return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
               numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
             );
            });
            setTableData(sorted);
           }
       };

    const columns = [
        { label: "Model name", accessor: "modelname", sortable: true },
        { label: "Sales name", accessor: "salesname", sortable: true },
        { label: "Certificate number", accessor: "certnumber", sortable: true },
        { label: "Product weight", accessor: "weight", sortable: true },
        { label: "Size (inches)", accessor: "Size", sortable: true },
        { label: "Aspect ratio", accessor: "aspectratio", sortable: true },
        { label: "Stand", accessor: "stand", sortable: true },
        { label: "Optional stand", accessor: "optionalstand", sortable: true },
       

        /*{ label: "Recycled plastics", accessor: "recycled_plastics", sortable: true },
        { label: "Recycled materials", accessor: "recycled_materials", sortable: true },
        { label: "PCF availability", accessor: "PCF_availability", sortable: true },
        { label: "ETEC ratio", accessor: "ETEC_ratio", sortable: true },
        { label: "Warranty period", accessor: "warranty_period", sortable: true },
        { label: "Extended warranty", accessor: "extended_warranty", sortable: true },
        { label: "Public repair policy", accessor: "public_repair_policy", sortable: true },
        { label: "Fasteners and connectors", accessor: "fasteners_and_connectors", sortable: true },
        { label: "Tools for repair and upgrade", accessor: "tools_repair_upgrade", sortable: true },
        { label: "Sparepart availability", accessor: "availability_spareparts", sortable: true },
        { label: "Duration availability", accessor: "duration_availability", sortable: true },
        { label: "Comprehensive information", accessor: "comprehensive_information", sortable: true },
        { label: "Multi stakeholder initiative", accessor: "multi_stakeholder_initiative", sortable: true }*/

    ];

    /*: 27
    availability_spareparts: 4
    compensated_manufactured_ratio: 7
    comprehensive_information: 3
    duration_availability: 4
    extended_warranty: 6
    warranty_period: 5
    fasteners_and_connectors: 1
    information_to_end_user_option_y: 3
    multi_stakeholder_initiative: 1
    recycled_materials: 5
    : 2
    public_repair_policy: 3
    tools_repair_upgrade: 1
    stand: "Pivot"
    optionalstand: "Yes"
    aspectratio: "16:9"
    TCO_Certified_logo_option: "B"
    resolutionheight: 1080
    resolutionwidth: 1920*/
   
    return (
        <div className="relative overflow-x-auto shadow-md max-w-7xl">
            <table className="w-full text-sm text-left text-gray-500">
                <caption className="italic mb-2">
                    Columns are sortable. 
                </caption>
                <TableHead columns={columns} handleSorting={handleSorting}/>
                <TableBody columns={columns} tableData={tableData} onSelect={modelname => props.onSelect(modelname)}/>
            </table>
        </div>
    );

};
