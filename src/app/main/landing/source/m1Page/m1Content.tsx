import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

/**
 * M1Content
 */
function M1Content({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "reporting_country", headerName: "Reporting Country", filter: true },
        { field: "brand", headerName: "Brand", filter: true },
        { field: "customer_group", headerName: "Customer Group", filter: true },
        { field: "apo_product", headerName: "APO Product", filter: true },
        { field: "product_description", headerName: "Product Description", filter: true},
        { field: "overall", headerName: "Overall (SU)", filter: true, cellRenderer: params => {
                return (params.value).toFixed(2);
            } },
        { field: "date", headerName: "Date", filter: true},
    ]);

    useEffect(() => {
        setRowData(jsonData)
    }, [jsonData]);


    const handleRowClick = (params) => {
    };


    return (
        <div className="flex-auto w-full h-full p-24 sm:p-40">
            <ToastContainer style={{marginTop: '50px'}}/>
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

export default M1Content;
