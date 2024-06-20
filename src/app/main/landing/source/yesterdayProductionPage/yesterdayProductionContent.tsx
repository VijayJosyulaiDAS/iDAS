import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

/**
 * YesterdayProductionContent
 */
function YesterdayProductionContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "plant", headerName: "Plant", filter: true },
        { field: "line_code", headerName: "Line Code", filter: true },
        { field: "prod_id", headerName: "Prod id", filter: true },
        { field: "prod_name", headerName: "Prod Name", filter: true },
        { field: "plan_order_qty", headerName: "Plan Order Qty", filter: true },
        { field: "confirmed_order_qty", headerName: "Confirmed Order Qty", filter: true },
        { field: "plan_order_qty_boum", headerName: "Plan Order Qty (BOUM)", filter: true },
        { field: "confirmed_order_qty_boum", headerName: "Confirmed Order Qty (BOUM)", filter: true },
    ]);

    useEffect(() => {
        setRowData(jsonData)
    }, [jsonData]);


    const handleRowClick = (params) => {
    };


    return (
        <div className="flex-auto w-full h-full p-24 sm:p-40">
                <div className="ag-theme-quartz" style={{ height: 680 }}>
                    <AgGridReact
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={100}
                        columnDefs={colDefs}
                        suppressMenuHide={true}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default YesterdayProductionContent;
