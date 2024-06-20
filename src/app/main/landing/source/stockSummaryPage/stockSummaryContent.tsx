import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

/**
 * BomContent
 */
function StockSummaryContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "material", headerName: "Material", filter: true },
        { field: "material_desc", headerName: "Material Description", filter: true },
        { field: "plant", headerName: "Plant", filter: true },
        { field: "criticality", headerName: "Criticality", filter: true },
        { field: "unrestricted", headerName: "Unrestricted", filter: true, cellRenderer: params => {
                console.log(params.value)
                return params.value ? parseInt(params.value).toFixed(2) : 0;
            } },
        { field: "qi", headerName: "QI", filter: true },
        { field: "blocked", headerName: "Blocked", filter: true},
        { field: "sap_dfc", headerName: " SAP DFC [MRP avail]", filter: true},
        { field: "moq", headerName: "MOQ", filter: true},
        { field: "mrp_controller", headerName: "MRP Controller", filter: true}
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

export default StockSummaryContent;
