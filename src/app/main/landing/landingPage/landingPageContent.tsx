import React, {useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Box} from "@mui/system";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from 'framer-motion';
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";

/**
 * LandingPage Content
 */
function LandingPageContent(props) {
    const {selectedData} = props
    const[openCount, setOpenCount] = useState<number>(0);
    const[closeCount, setCloseCount] = useState<number>(0);
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const [colDefs, setColDefs] = useState([
        { field: "priority", headerName: "Priority", filter: true },
        { field: "due_date", headerName: "Due Date", filter: true },
        { field: "description", headerName: "Description", filter: true },
        { field: "source_location", headerName: "Source Location", filter: true },
        { field: "material_code", headerName: "Material Code", filter: true },
        { field: "revenue_impact", headerName: "Revenue Impact(Proj.)", filter: true },
        { field: "unit_impact", headerName: "Unit Impact(Proj.)", filter: true },
        { field: "impact_coverage", headerName: "Impact Coverage", filter: true },
        { field: "confidence_score", headerName: "Confidence Score", filter: true }
    ]);

    const fetchRecommendations = async () => {
        setLoading(true); // Start loading
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendationByUseCase?id=${selectedData.id}`);
            setRowData(response.data.data);
            setOpenCount(response.data.open);
            setCloseCount(response.data.close);
            tabData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        if (selectedData != null || selectedData != undefined) {
            fetchRecommendations();
        }
    }, [selectedData]);

    const tabData = (data) => {
        if (tabValue == 0) {
            const filteredData = data.filter(item => item.status == 'Open');
            setFilterData(filteredData);
        } else {
            const filteredData = data.filter(item => item.status == 'Close');
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
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <FuseLoading className="loader">Loading...</FuseLoading>
                        </div>
                    ) : (
                        <AgGridReact
                            rowData={filteredData}
                            pagination={true}
                            paginationPageSize={100}
                            loading={loading}
                            overlayLoadingTemplate={
                                <div className="flex justify-center items-center h-full">
                                    <FuseLoading className="loader">Loading...</FuseLoading>
                                </div>
                            }
                            columnDefs={colDefs}
                            onRowClicked={handleRowClick}
                        />
                    )}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    className="flex flex-col flex-1 items-center justify-center h-full"
                >
                    <Typography
                        color="text.secondary"
                        variant="h5"
                    >
                        There is no data!
                    </Typography>
                    <Button
                        className="mt-24"
                        variant="outlined"
                        color="inherit"
                    >
                        Please Choose a use case
                    </Button>
                </motion.div>
            )}
        </div>
    );
};

export default LandingPageContent;
