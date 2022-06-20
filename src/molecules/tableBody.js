export default function TableBody(props) {
    return (
        <tbody>
            {props.tableData.map((data) => {
                return (
                    <tr className="border-t last:border-0 hover:bg-gray-400 even:bg-gray-200 odd:bg-white" onMouseOver={() => props.onSelect(data.modelname)} onMouseLeave={() => props.onSelect("")} key={data.id}>
                        {props.columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "——";
                            return <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" key={accessor}>{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );

};
