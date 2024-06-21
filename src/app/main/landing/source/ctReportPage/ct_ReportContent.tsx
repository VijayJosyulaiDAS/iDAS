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
function Ct_ReportContent({jsonData}) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "category", headerName: "Category", filter: true, width: 210 },
        { field: "po_number", headerName: "PO Number", filter: true},
        { field: "material_code", headerName: "Material Code", filter: true},
        { field: "material_description", headerName: "Material Description", filter: true},
        { field: "po_status", headerName: "PO Status", filter: true},
        { field: "sourcing_plant", headerName: "Sourcing Plant", filter: true},
        { field: "po_date", headerName: "PO Date", filter: true},
        { field: "eta__po_pdt", headerName: "ETA PO PDT", filter: true},
        { field: "vendor_name", headerName: "Vendor Name", filter: true},
        { field: "vendor_code", headerName: "Vendor Code", filter: true},
        { field: "uom", headerName: "UOM", filter: true},
        { field: "qty", headerName: "Qty", filter: true},
        { field: "open_qty", headerName: "Open Qty", filter: true},
        { field: "etd", headerName: "ETD", filter: true},
        { field: "atd", headerName: "ATD", filter: true},
        { field: "vehicle_no", headerName: "Vehicle No", filter: true},
        { field: "driver_no", headerName: "Driver No", filter: true},
        { field: "transporter/invoice_no", headerName: "Transport/Invoice No", filter: true},
        { field: "ata", headerName: "ATA", filter: true},
        { field: "supplier_confirmed_eta", headerName: "Supplier Confirm ETA", filter: true},
        { field: "no._of_days_early/late", headerName: "No Of Days Early/Late", filter: true},
        { field: "ct_comments", headerName: "Ct Comments", filter: true},
        { field: "pdt", headerName: "PDT", filter: true},
        { field: "transist_time", headerName: "Transit Time", filter: true},
        { field: "insertion_date", headerName: "Insertion Date", filter: true},
        { field: "report_date", headerName: "Report Date", filter: true}
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

export default Ct_ReportContent;
