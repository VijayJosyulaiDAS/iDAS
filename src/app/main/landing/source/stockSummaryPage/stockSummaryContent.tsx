import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

/**
 * BomContent
 */
function StockSummaryContent() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "material", headerName: "Material", filter: true },
        { field: "material_desc", headerName: "Material Description", filter: true },
        { field: "plant", headerName: "Plant", filter: true },
        { field: "criticality", headerName: "Criticality", filter: true },
        { field: "unrestricted", headerName: "Unrestricted", filter: true },
        { field: "qi", headerName: "QI", filter: true },
        { field: "blocked", headerName: "Blocked", filter: true},
        { field: "safety_stock", headerName: "Safety Stock", filter: true},
        { field: "sap_dfc", headerName: " SAP DFC [MRP avail]", filter: true},
        { field: "iwl_status", headerName: "IWL Status", filter: true},
        { field: "next_planned_reciept_date", headerName: "Next Planned Reciept date", filter: true},
        { field: "next_po_number", headerName: "Next PO Number", filter: true},
        { field: "next_po_qty", headerName: "Next PO QTY", filter: true},
        { field: "me_inv", headerName: "ME inv", filter: true},
        { field: "moq", headerName: "MOQ", filter: true},
        { field: "agreed_st_days", headerName: "AGREED ST DAYS", filter: true},
        { field: "grpt", headerName: "GRPT", filter: true},
        { field: "mrp_controller", headerName: "MRP Controller", filter: true},
        { field: "unrestricted_new", headerName: "Unrestricted New", filter: true},
        { field: "qi_new", headerName: "QI NEW", filter: true},
        { field: "material_type", headerName: "Material Type", filter: true},
        { field: "blocked_new", headerName: "Blocked New", filter: true}
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/stock_summary`);
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

export default StockSummaryContent;
