import React, {useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Box} from "@mui/system";
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from 'framer-motion';
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy
} from "@ag-grid-community/core";

/**
 * LandingPage Content
 */
function LandingPageContent(props) {
    const {selectedData} = props
    const[openCount, setOpenCount] = useState<number>(0);
    const[closeCount, setCloseCount] = useState<number>(0);
    const [rowData, setRowData] = useState(null);
    const [filteredData, setFilterData] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [colDefs, setColDefs] = useState([]);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendationByUseCase?id=${selectedData.id}`);
            const order = ["Firm Zone Production Adjustments", "Supplier PO Amendments"];
            const orderedItems = response.data.data.filter(item => order.includes(item.title));
            const remainingItems = response.data.data.filter(item => !order.includes(item.title));
            const result = [
                ...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
                ...remainingItems
            ];
            setRowData(result);
            setOpenCount(response.data.open);
            setCloseCount(response.data.close);
            tabData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedData != null || selectedData != undefined) {
            if(selectedData.title == "Firm Zone Production Adjustments"){
               setColDefs([
                   { field: "priority", headerName: "Priority", filter: true },
                   { field: "due_date", headerName: "Due Date", filter: true },
                   { field: "description", headerName: "Description", filter: true },
                   { field: "plant_code", headerName: "Plant Code", filter: true },
                   { field: "firm_zone_time", headerName: "Firm Zone Time", filter: true },
                   { field: "total_adjustment", headerName: "Total Adjustment", filter: true },
                   { field: "createdAt", headerName: "Recommendation Date", filter: true}
               ])
            }
            if(selectedData.title == "Supplier PO Amendments"){
               setColDefs([
                   { field: "material_code", headerName: "Material Code", filter: true },
                   { field: "po_number", headerName: "PO Number", filter: true },
                   { field: "priority", headerName: "Priority", filter: true },
                   { field: "due_date", headerName: "Due Date", filter: true, cellRenderer: params => {
                           return params.value?.split('T')[0];
                       } },
                   { field: "createdAt", headerName: "Recommendation Date", filter: true, cellRenderer: params => {
                           return params.value?.split('T')[0];
                       } },
                   { field: "description", headerName: "Description", filter: true },
                   { field: "order_type", headerName: "Order Type", filter: true },
                   { field: "quantity", headerName: "Quantity", filter: true },
                   { field: "supplier_code", headerName: "Supplier Code", filter: true },
                   { field: "lead_time", headerName: "Lead Time", filter: true }
                ])
            }
            if(selectedData.title == "Realtime Supply Confirmation for Upsides"){
                setColDefs( [
                    { field: "priority", headerName: "Priority", filter: true },
                    { field: "due_date", headerName: "Due Date", filter: true },
                    { field: "description", headerName: "Description", filter: true },
                    { field: "change_in_demand", headerName: "Change In Demand", filter: true },
                    { field: "open_orders", headerName: "Open Orders", filter: true },
                    { field: "in_transit_orders", headerName: "In Transit Orders", filter: true },
                    { field: "createdAt", headerName: "Recommendation Date", filter: true}
                ])
            }
            fetchRecommendations();
        }
    }, [selectedData]);

    const tabData = (data) => {
        if (tabValue == 0) {
            const filteredData = data?.filter(item => item.active);
            setFilterData(filteredData);
        } else {
            const filteredData = data.filter(item => !item.active);
            setFilterData(filteredData);
        }
    };

    useEffect(() => {
        tabData(rowData);
    }, [tabValue]);

    const handleRowClick = (params) => {
        localStorage.setItem('recommendationData', JSON.stringify(params.data));
        navigate(`/apps/recommendations`);
    };

    function handleChangeTab(event: React.SyntheticEvent, value: number) {
        setTabValue(value);
    }

    return (
        <div className="flex-auto w-full h-full p-24 sm:p-40">
            {selectedData ? (
                <div className="ag-theme-quartz" style={{ height: 680 }}>
                    <div className='m-5 flex w-full gap-80 justify-between flex-row'>
                        <span className='font-semibold'>{`${selectedData.title.split('-')[0]}`}</span>
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons={false}
                            className="px-24 min-h-40"
                            classes={{ indicator: 'flex justify-center bg-transparent h-full' }}
                            TabIndicatorProps={{
                                children: (
                                    <Box
                                        sx={{ bgcolor: 'text.disabled' }}
                                        className="w-full h-full rounded-full opacity-20"
                                    />
                                )
                            }}
                        >
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label={`Open ${openCount}`}
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label={`Closed ${closeCount}`}
                            />
                        </Tabs>
                    </div>
                    {/*{loading ? (*/}
                    {/*    <div className="flex justify-center items-center h-full">*/}
                    {/*        <FuseLoading></FuseLoading>*/}
                    {/*    </div>*/}
                    {/*) : (*/}
                        <AgGridReact
                            rowData={filteredData}
                            pagination={true}
                            paginationPageSize={100}
                            suppressMenuHide={true}
                            columnDefs={colDefs}
                            onRowClicked={handleRowClick}
                        />
                    {/*)}*/}
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <FuseLoading></FuseLoading>
                </div>
            )}
        </div>
    );
};

export default LandingPageContent;
