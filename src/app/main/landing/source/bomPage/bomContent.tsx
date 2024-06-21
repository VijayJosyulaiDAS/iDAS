import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * BomContent
 */
function BomContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "id_of_product_material", headerName: "Product Material", filter: true },
        { field: "bill_of_material", headerName: "Bill Of Material", filter: true },
        { field: "bom_component", headerName: "BOM Component", filter: true },
        { field: "base_unit_of_measure", headerName: "Base Unit Of Measure", filter: true },
        { field: "quantity", headerName: "Component quantity", filter: true},
        { field: "component_scrap_in_percent", headerName: "Component Scrap (%)", filter: true},
        { field: "insertion_date", headerName: "Insertion Date", filter: true},
    ]);

    useEffect(() => {
        setRowData(jsonData)
    }, [jsonData]);


    const handleRowClick = (params) => {
    };

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
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
                        onGridReady={onGridReady}
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default BomContent;
