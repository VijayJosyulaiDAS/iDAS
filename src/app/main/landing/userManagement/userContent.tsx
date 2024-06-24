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
 * UserContent
 */
function UserContent() {
    const [rowData, setRowData] = useState<any>();
    const [colDefs, setColDefs] = useState([
        { field: "id", headerName: "User ID", filter: true },
        { field: "name", headerName: "Name", filter: true},
        { field: "email", headerName: "User Email", filter: true},
        { field: "role", headerName: "Role", filter: true, editable: true, cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['user', 'admin']
            }},
        { field: "business_unit_name", headerName: "Business Unit Name", filter: true,  editable: true,  cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Hair Care', 'Shave care', 'Feminine Care', 'Baby Care', 'Fabric Care', 'Health Care', 'Home Care', 'Oral Care', 'Shave Care', 'Skin & Personal Care', 'IT']
            }}
    ]);

    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_user`);
            setRowData(response.data.data);
            // toast.success('Data loaded successfully.', { autoClose: 1500 });
        } catch (error) {
            setRowData([])
            // toast.error(`Something Went Wrong while fetching data.`, {autoClose: 1500})
            console.error('Failed to fetch recommendations:', error);
        }
    };


    const updateUser = async (data) => {
        let response = await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/update_user`,data);
        fetchData()
    }


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

    const handleCellValueChanged = (event) => {
        const { oldValue, newValue, data, colDef, column } = event;
        console.log('Old Value:', oldValue);
        console.log('New Value:', newValue);
        console.log('Data:', data);
        console.log('Column:', colDef.field);
        let obj = {
            email: data.email,
            business_unit_name: data.business_unit_name,
            role: data.role
        }
        updateUser(obj).then(r => {
            console.log(r)
        })
        fetchData();
    };


    return (
        <div className="flex-auto w-full h-full p-24 sm:p-40">
            {/*<ToastContainer style={{marginTop: '50px'}}/>*/}
            <div className="ag-theme-quartz" style={{ height: 680 }}>
                <AgGridReact
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={100}
                    autoSizeStrategy={autoSizeStrategy}
                    columnDefs={colDefs}
                    onRowClicked={handleRowClick}
                    onCellValueChanged={handleCellValueChanged}
                />
            </div>
        </div>
    );
};

export default UserContent;
