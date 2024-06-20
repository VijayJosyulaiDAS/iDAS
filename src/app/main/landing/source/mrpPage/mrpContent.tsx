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
 * M1Content
 */
function MrpContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "category", headerName: "Category", filter: true},
        { field: "material_code", headerName: "Material Code", filter: true},
        { field: "material_desc", headerName: "Material Desc", filter: true},
        { field: "mrp", headerName: "MRP", filter: true},
        { field: "safety_stock", headerName: "Safety Stock (UoM)", filter: true},
        { field: "minimum_lot_size", headerName: "Minimum Lot Size", filter: true},
        { field: "base_unit_of_measure", headerName: "Base Unit Of Measure", filter: true},
        { field: "plant", headerName: "Plant", filter: true },
        { field: "availability_check", headerName: "Availability Check", filter: true},
        { field: "rounding_value", headerName: "Rounding Value (UoM)", filter: true},
        { field: "planned_delivery_time", headerName: "Planned Delivery Time", filter: true},
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
                        columnDefs={colDefs}
                        suppressMenuHide={true}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default MrpContent;
