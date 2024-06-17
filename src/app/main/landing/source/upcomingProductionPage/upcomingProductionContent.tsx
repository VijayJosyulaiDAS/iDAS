import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

/**
 * BomContent
 */
function UpcomingProductionContent() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "material", headerName: "Material", filter: true },
        { field: "material_description", headerName: "Material Description", filter: true },
        { field: "plant", headerName: "Plant", filter: true },
        { field: "valid_from", headerName: "Valid From", filter: true },
        { field: "valid_to", headerName: "Valid to", filter: true },
        { field: "confirmed_quantity", headerName: "Confirmed Quantity", filter: true },
        { field: "component", headerName: "Component", filter: true},
        { field: "material_description", headerName: "Material Description.1", filter: true},
        { field: "quantity", headerName: "Component quantity", filter: true},
        { field: "component_unit", headerName: "Component unit", filter: true},
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/bodm_data`);
            setRowData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };


    useEffect(() => {
        fetchData();
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

export default UpcomingProductionContent;
