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
function PoContent() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "Material", headerName: "Material", filter: true, width: 120  },
        { field: "Material Description", headerName: "Material Description", filter: true, width: 120},
        { field: "MRP Element", headerName: "MRP Element", filter: true, width: 120},
        { field: "MRP Element Description", headerName: "MRP Element Description", filter: true, width: 120},
        { field: "Quantity", headerName: "Quantity", filter: true, width: 120},
        { field: "UoM", headerName: "UoM", filter: true, width: 120},
        { field: "Planned Receipt Date", headerName: "Planned Receipt Date", filter: true, width: 120},
        { field: "Planned Avail. Date", headerName: "Planned Avail. Date", filter: true, width: 120},
        { field: "First Usage Date", headerName: "First Usage Date", filter: true, width: 120},
        { field: "Reqd Receipt Date", headerName: "Reqd Receipt Date", filter: true, width: 120},
        { field: "MRP Controller", headerName: "MRP Controller", filter: true, width: 120},
        { field: "First Usage Avail. Date", headerName: "First Usage Avail. Date", filter: true, width: 120},
        { field: "Pegged Requirement", headerName: "Pegged Requirement", filter: true, width: 120},
        { field: "Pegged Material Description", headerName: "Pegged Material Description", filter: true, width: 120},
        { field: "Safety Stock", headerName: "Safety Stock", filter: true, width: 120},
        { field: "Criticality Indicator", headerName: "Criticality Indicator", filter: true, width: 120},
        { field: "Critical Quantity % (BGR)", headerName: "Critical Quantity % (BGR)", filter: true, width: 120},
        { field: "Critical Quantity % (AGR)", headerName: "Critical Quantity % (AGR)", filter: true, width: 120},
        { field: "In Transit", headerName: "In Transit", filter: true, width: 120},
        { field: "In Transit + Stock", headerName: "In Transit + Stock", filter: true, width: 120},
        { field: "Days Forward Coverage", headerName: "Days Forward Coverage", filter: true, width: 120},
        { field: "Source (Vendor/Plant)", headerName: "Source (Vendor/Plant)", filter: true, width: 120},
        { field: "Comments", headerName: "Comments", filter: true, width: 120},
        { field: "BOL#", headerName: "BOL#", filter: true, width: 120},
        { field: "Maximum Stock", headerName: "Maximum Stock", filter: true, width: 120},
        { field: "GRPT", headerName: "GRPT", filter: true, width: 120},
        { field: "Batch# for QM lot", headerName: "Batch# for QM lot", filter: true, width: 120},
        { field: "ShipNote Delivery#", headerName: "ShipNote Delivery#", filter: true, width: 120},
        { field: "Plant", headerName: "Plant", filter: true, width: 120},
        { field: "MRP Element Detail", headerName: "MRP Element Detail", filter: true, width: 120},
        { field: "insertion_date", headerName: "Insertion Date", filter: true, width: 120}
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/pos_data`);
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
                        columnDefs={colDefs}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default PoContent;
