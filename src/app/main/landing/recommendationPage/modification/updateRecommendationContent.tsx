import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useCallback, useEffect, useMemo, useState} from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy
} from "@ag-grid-community/core";

function UpdateRecommendationContent({setSelectedRow}) {
    const [value, setValue] = React.useState('1');
    const {recommendationId} = useParams();
    const [loading, setLoading] = React.useState(true);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            width: 10,
            checkboxSelection: true,
        },
        { field: "id", headerName: "Recommendation Id", filter: true },
        { field: "description", headerName: "Description", filter: true },
        { field: "best_alternative",
            headerName: "Best Alternative",
            filter: true,
            cellRenderer: params => {
                if (params.value) {
                    return 'Yes'
                }
                return 'No';
            }
        },
        { field: "source_location", headerName: "Source", filter: true },
        { field: "po_original_qty", headerName: "Original Quantity", filter: true },
        { field: "po_minimum_order_quantity", headerName: "Minimum Order Quantity", filter: true }
    ]);
    const navigate = useNavigate();

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

    const fetchAllRecommendations = async () =>{
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendationById?id=${recommendationId}`);
        setLoading(false)
        setRowData(response.data.data)
    }

    useEffect(() => {
        fetchAllRecommendations()
    }, [recommendationId]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleBackClick = () => {
        navigate('/apps/recommendations')
    }

    const handleRowSelection = params => {
        const selectedNodes = params.api.getSelectedNodes();
        if (selectedNodes.length > 0) {
            setSelectedRow(selectedNodes[0].data);
        } else {
            setSelectedRow(null);
        }
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box className='flex flex-wrap items-center m-10 gap-20' style={{color: '#2596F3'}}>
                    <div onClick={handleBackClick} className='h-auto p-5 w-auto rounded-full border-2 cursor-pointer'>
                        <FuseSvgIcon size={24} className='text-blue-500 font-bold text-lg'>heroicons-outline:arrow-narrow-left</FuseSvgIcon>
                    </div>
                    <TabList indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example" style={{color: '#2596F3'}}>
                        <Tab color='secondary' className='text-blue-500' label="Evaluate Alternatives" value="1" style={{color: '#2596F3'}} />
                    </TabList>
                </Box>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <FuseLoading></FuseLoading>
                    </div>
                ) : (
                    <TabPanel className='w-full h-full ag-theme-quartz'  style={{ height: 680 }} color='secondary' value="1">
                        <AgGridReact
                            rowData={rowData}
                            pagination={true}
                            paginationPageSize={100}
                            autoSizeStrategy={autoSizeStrategy}
                            rowSelection={"single"}
                            columnDefs={colDefs}
                            onSelectionChanged={handleRowSelection}
                        />
                     </TabPanel>
                )}
            </TabContext>
        </Box>
    );
}

export default UpdateRecommendationContent
