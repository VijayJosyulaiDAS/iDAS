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

/**
 * M1Content
 */
function ProductionContent() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "apo_product", headerName: "APO Product", filter: true },
        { field: "produced", headerName: "Produced", filter: true},
        { field: "insertion_date", headerName: "Insertion Date", filter: true},
        { field: "date", headerName: "Date", filter: true},
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/production_data`);
            setRowData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

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
                <div className="ag-theme-quartz" style={{ height: 680 }}>
                    <AgGridReact
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={100}
                        autoSizeStrategy={autoSizeStrategy}
                        columnDefs={colDefs}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default ProductionContent;
