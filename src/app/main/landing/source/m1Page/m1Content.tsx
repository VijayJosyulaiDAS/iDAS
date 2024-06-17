import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

/**
 * M1Content
 */
function M1Content() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: "reporting_country", headerName: "Reporting Country", filter: true },
        { field: "brand", headerName: "Brand", filter: true },
        { field: "organization", headerName: "Organization", filter: true },
        { field: "customer_group", headerName: "Customer Group", filter: true },
        { field: "sfu_version", headerName: "SFU Version", filter: true },
        { field: "apo_product", headerName: "APO Product", filter: true },
        { field: "product_description", headerName: "Product Description", filter: true},
        { field: "overall", headerName: "Overall", filter: true},
        { field: "plant_codes", headerName: "Plant Codes", filter: true},
        { field: "distributors", headerName: "Distributors", filter: true},
        { field: "source_dc", headerName: "Source DC", filter: true},
        { field: "date", headerName: "Date", filter: true},
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/m1_data`);
            setRowData(response.data.data);
            // toast.success('Data loaded successfully.', { autoClose: 1500 });
        } catch (error) {
            toast.error(`Something Went Wrong while fetching data.`, {autoClose: 1500})
            console.error('Failed to fetch m1 data:', error);
        }
    };


    useEffect(() => {
        fetchData();
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
                        onRowClicked={handleRowClick}
                    />
                </div>
        </div>
    );
};

export default M1Content;
