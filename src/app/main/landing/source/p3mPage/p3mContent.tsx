import React, {useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy
} from "@ag-grid-community/core";
import {toast, ToastContainer} from "react-toastify";

/**
 * ProductionContent
 */
function P3mContent({jsonData}) {
    const [rowData, setRowData] = useState();


    function convertDate(inputDate) {
        // Define the epoch date
        const epoch = new Date(1900, 0, 1); // January 1, 1900

        // Add the number of days to the epoch date
        const date = new Date(epoch.getTime() + inputDate * 24 * 60 * 60 * 1000);

        // Extract day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        // Return the formatted date
        return `${day}/${month}/${year}`;
    }
    const [colDefs, setColDefs] = useState([
        { field: "rm_code", headerName: "Rm Code", filter: true },
        { field: "posting_date", headerName: "Posting Date", filter: true, cellRenderer: params => {
                return convertDate(params.value);
            } },
        { field: "qty", headerName: "Quantity", filter: true},
        { field: "uom", headerName: "UOM", filter: true}
    ]);

    useEffect(() => {
        setRowData(jsonData)
    }, [jsonData]);


    const autoSizeStrategy = useMemo<
        | SizeColumnsToFitGridStrategy
        | SizeColumnsToFitProvidedWidthStrategy
        | SizeColumnsToContentStrategy
    >(() => {
        return {
            type: "fitGridWidth",
            defaultMinWidth: 100
        };
    }, []);


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
                        suppressMenuHide={true}
                        autoSizeStrategy={autoSizeStrategy}
                        columnDefs={colDefs}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default P3mContent;
