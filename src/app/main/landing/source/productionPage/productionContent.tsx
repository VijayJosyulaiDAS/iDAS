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
function ProductionContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "apo_product", headerName: "APO Product", filter: true },
        { field: "produced", headerName: "Produced", filter: true},
        { field: "insertion_date", headerName: "Insertion Date", filter: true},
        { field: "date", headerName: "Date", filter: true, cellRenderer: params => {
                return params.value?.split('T')[0];
            }},
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

export default ProductionContent;
