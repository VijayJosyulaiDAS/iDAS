import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

/**
 * UpcomingProductionContent
 */
function UpcomingProductionContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "plant", headerName: "Plant", filter: true },
        { field: "prod_id", headerName: "Prod id", filter: true },
        { field: "line_code", headerName: "Line Code", filter: true },
        { field: "prod_name", headerName: "Prod Name", filter: true },
        { field: "order_num", headerName: "Order Number", filter: true },
        { field: "schedule_start_date_year", headerName: "Schedule Start Date - Year", filter: true },
        { field: "schedule_start_date_month", headerName: "Schedule Start Date - Month", filter: true },
        { field: "schedule_start_date_day", headerName: "Schedule Start Date - Day", filter: true },
        { field: "plan_order_qty", headerName: "Plan Order QTY", filter: true },
        { field: "plan_order_qty_boum", headerName: "Plan Order Qty (BOUM)", filter: true },
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
                        suppressMenuHide={true}
                        columnDefs={colDefs}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default UpcomingProductionContent;
