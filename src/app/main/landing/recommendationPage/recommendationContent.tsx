import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {AgGridReact} from "ag-grid-react";
import Paper from "@mui/material/Paper";
import {useAppSelector} from "app/store/hooks";
import {selectUser} from "../../../auth/user/store/userSlice";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy
} from "@ag-grid-community/core";

/**
 * RecommendationPage Content
 */

interface ChartDataItem {
    date: string;
    currentPlan: number;
    currentForecast: number;
    projectedInventory: number;
    safety: number;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function RecommendationPageContent(props) {
    const savedData = localStorage.getItem('recommendationData');
    const [recommendation, setData] = React.useState<any>(JSON.parse(savedData));
    const user = useAppSelector(selectUser);
    const [openDialog, setOpenDialog] = useState(false);
    const [description, setDescription] = useState('')
    const [action, setAction] = useState(true)
    const [showChart,setShowChart] = useState(false)
    const [rowData, setRowData] = useState(
        [
            {
                "id": "1",
                "root_cause": "Safety Stock",
                "description": "The minimum quantity of a product that must be kept in stock to prevent stock outs.",
                "root_cause_code": "SS001"
            },
            {
                "id": "2",
                "root_cause": "RM DFC",
                "description": "The number of days the current stock level can satisfy customer demand.",
                "root_cause_code": "RM002"
            },
            {
                "id": "3",
                "root_cause": "FG Description",
                "description": "Information about the finished goods.",
                "root_cause_code": "FG003"
            },
            {
                "id": "4",
                "root_cause": "FG Demand Variations",
                "description": "Variations in the demand for the finished goods.",
                "root_cause_code": "DV004"
            },
            {
                "id": "5",
                "root_cause": "FG BOM",
                "description": "Raw materials required to produce the finished goods.",
                "root_cause_code": "BOM005"
            },
            {
                "id": "6",
                "root_cause": "Production Version",
                "description": "Production lines.",
                "root_cause_code": "PV006"
            }
        ]
    );
    const chartRef = useRef(null);

    const [selectedRow, setSelectedRow] = useState(null)
    let columns = [
        {
            field: "root_cause_code",
            headerName: "Root Cause Code",
            filter: false
        },
        { field: "root_cause", headerName: "Root Cause", filter: true },
        { field: "description", headerName: "Description", filter: true }
    ]
    const [colDefs, setColDefs] = useState([]);

    useEffect(() => {
        setColDefs(columns)
    }, [showChart]);

    const navigate = useNavigate()

    function formatDateString(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        return `${month} ${day}, ${year}`;
    }

    const data = [
        { category: "Safety Stock", value: 35 },
        { category: "RM DFC", value: 20 },
        { category: "FG Description", value: 10 },
        { category: "FG Demand Variations", value: 10 },
        { category: "FG BOM", value: 10 },
        { category: "Production Version", value: 10 },
        { category: "Other", value: 5 }
    ];

    const cardData  = {
        title: recommendation.description,
        date: formatDateString(recommendation.due_date),
        description: `The Demand Forecast is predicting an ${recommendation.demand_type} in Demand of ${recommendation.demand_value} for the Material Code ${recommendation.material_code}. Based on the available inventory of ${recommendation.available_inventory_value} and a Lead Time 
            of ${recommendation.lead_time} days, you should ${recommendation.order_type} ${recommendation.po_number} with the Quantity ${recommendation.po_quantity_value}`
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    const updateRecommendation = async (data) => {
        let response = await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/update_recommendations?id=${recommendation.id}`, data);
        console.log(response)
    }

    const handleSaveSelection = async (e) => {
        e.preventDefault();
        let data = {
            use_case_id: recommendation.use_case_id,
            active: action,
            action_owner: user.data.email,
            recommendation_action: 'Dismiss',
            user_desc: description
        }
        updateRecommendation(data)
        setOpenDialog(false)
        navigate(`/apps/landing/${recommendation.id}`)
    }

    // const chartRef = useRef<am4charts.XYChart | null>(null);

    useLayoutEffect(() => {
        // let chart = am4core.create('chartdiv', am4charts.XYChart);
        // chartRef.current = chart;
        //
        // // Specify the data type for chart data
        // chart.data = [
        //     { "date": "2024-06-13", "currentPlan": 102497, "currentForecast": 100000, "projectedInventory": 100000, "safety": 50000 },
        //     { "date": "2024-06-14", "currentPlan": 85461, "currentForecast": 50000, "projectedInventory": 0, "safety": 50000 },
        //     { "date": "2024-06-15", "currentPlan": 91224, "currentForecast": 100000, "projectedInventory": 123000, "safety": 50000 },
        //     { "date": "2024-06-16", "currentPlan": 95051, "currentForecast": 200000, "projectedInventory": 0, "safety": 50000 },
        //     { "date": "2024-06-17", "currentPlan": 94021, "currentForecast": 250000, "projectedInventory": 0, "safety": 50000 },
        //     { "date": "2024-06-18", "currentPlan": 94309, "currentForecast": 300000, "projectedInventory": -100000, "safety": 50000 },
        //     { "date": "2024-06-19", "currentPlan": 96509, "currentForecast": 275000, "projectedInventory": -150000, "safety": 50000 },
        //     { "date": "2024-06-20", "currentPlan": 89193, "currentForecast": 250000, "projectedInventory": -150000, "safety": 50000 },
        //     { "date": "2024-06-21", "currentPlan": 103332, "currentForecast": 200000, "projectedInventory": -150000, "safety": 50000 },
        //     { "date": "2024-06-22", "currentPlan": 93290, "currentForecast": 100000, "projectedInventory": -150000, "safety": 50000 },
        //     { "date": "2024-06-23", "currentPlan": 88969, "currentForecast": 0, "projectedInventory": -50000, "safety": 50000 },
        //     { "date": "2024-06-24", "currentPlan": 9574, "currentForecast": 0, "projectedInventory": -50000, "safety": 50000 },
        //     { "date": "2024-06-25", "currentPlan": 0, "currentForecast": 0, "projectedInventory": 0, "safety": 50000 },
        //     { "date": "2024-06-26", "currentPlan": 0, "currentForecast": 0, "projectedInventory": 0, "safety": 50000 }
        // ] as ChartDataItem[];
        //
        // // Create date axis
        // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.minGridDistance = 50;
        // dateAxis.dateFormats.setKey("day", "dd-MMM");
        //
        // // Create value axis
        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //
        // // Create series for Current Forecast
        // let currentSeries = chart.series.push(new am4charts.LineSeries());
        // currentSeries.name = "Current Forecast";
        // currentSeries.dataFields.valueY = "currentForecast";
        // currentSeries.dataFields.dateX = "date";
        // currentSeries.strokeWidth = 2;
        // currentSeries.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        //
        // // Add bullets (points) to Current Forecast
        // let currentBullet = currentSeries.bullets.push(new am4charts.Bullet());
        // let currentCircle = currentBullet.createChild(am4core.Circle);
        // currentCircle.radius = 5;
        // currentCircle.fill = am4core.color("#fff");
        // currentCircle.strokeWidth = 2;
        //
        // // Create series for Projected Inventory
        // let inventorySeries = chart.series.push(new am4charts.ColumnSeries());
        // inventorySeries.name = "Projected Inventory";
        // inventorySeries.dataFields.valueY = "projectedInventory";
        // inventorySeries.dataFields.dateX = "date";
        // inventorySeries.columns.template.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        // inventorySeries.columns.template.adapter.add("fill", function(fill, target) {
        //     const dataItem = target.dataItem.dataContext as ChartDataItem;
        //     return target.dataItem.values.valueY?.value < dataItem.safety
        //         ? am4core.color("#FF9999")
        //         : am4core.color("lightblue");
        // });
        // inventorySeries.columns.template.adapter.add("stroke", function(stroke, target) {
        //     const dataItem = target.dataItem.dataContext as ChartDataItem;
        //     return target.dataItem.values.valueY?.value < dataItem.safety
        //         ? am4core.color("#FF9999")
        //         : am4core.color("lightblue");
        // });
        //
        // // Add legend
        // chart.legend = new am4charts.Legend();
        //
        // // Add cursor
        // chart.cursor = new am4charts.XYCursor();
        //
        // return () => {
        //     chart.dispose();
        // };

        // For the Pie Chart
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = data;
        chart.logo.dispose();


        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        chart.hiddenState.properties.radius = am4core.percent(0);

        chartRef.current = chart;

        return () => {
            chart.dispose();
        };
    }, [showChart]);


    const handleClick = (event) => {
        console.log(event.target.id);
        if(event.target.id == 'dismiss'){
            setOpenDialog(true)
            setAction(false)
        }
        if(event.target.id == 'accept'){
            setAction(false)
            let data = {
                use_case_id: recommendation.use_case_id,
                recommendation_action: 'Accept',
                action_owner: user.data.email,
                active: false
            }
            updateRecommendation(data)
            navigate(`/apps/landing/${recommendation.id}`)
        }
        if(event.target.id == 'modify'){
            let data = recommendation.po_number ? recommendation.po_number : recommendation.id
            navigate(`/apps/recommendations/${data}`)
        }
        if(event.target.id == 'details'){
            console.log(event.target.id);
            setShowChart(prevShowChart => !prevShowChart);
        }
    };
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

    const handleRowSelection = params => {
        const selectedNodes = params.api.getSelectedNodes();
        console.log(selectedNodes)
        if (selectedNodes.length > 0) {
            setSelectedRow(selectedNodes[0].data);
        } else {
            setSelectedRow(null);
        }
    };

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div className="flex-auto p-24 flex w-full gap-10 justify-between flex-row'">
            <div className="w-2/5 flex justify-between">
                <div className=" mt-20 w-full max-h-auto border relative flex lg:flex-col md:flex-row sm:flex-row shadow bg-white rounded-2xl overflow-x-scroll"
                    style={{height: "60%"}}>
                    <div className="flex w-full items-start flex-col  justify-start px-8 pt-32">
                        <Typography
                            className="px-16 text-sm font-medium text-blue-500 tracking-tight leading-6 truncate"
                        >
                            {cardData.date}
                        </Typography>
                        <Typography
                            className="px-16 text-lg font-medium tracking-tight leading-6"
                        >
                            {cardData.title}
                        </Typography>
                    </div>
                    <div className="flex justify-between mt-20 w-full h-full flex-col">
                        <div
                            className="text-md font-medium md:mr-24 text-grey-700  md:ml-24 ">{cardData.description}
                        </div>
                        {
                            recommendation.recommendation_action != null &&
                            <div
                                className="text-md font-medium md:mr-24 text-grey-700  md:ml-24 ">
                                <Typography
                                    className=" flex flex-col text-black tracking-tight leading-6"
                                >
                                    <span className='text-lg font-medium'>Action by: {recommendation.action_owner}</span>
                                    <span>User Action: {recommendation.recommendation_action}</span>
                                    <span>User Description: {recommendation.user_desc}</span>
                                </Typography>
                            </div>
                        }
                        <div
                            className="flex m-20 justify-center gap-32 items-center"
                            color="text.secondary"
                        >
                            {recommendation.recommendation_action == null && (
                                <>
                                    <Button
                                        id='dismiss'
                                        variant="outlined"
                                        color='secondary'
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        Dismiss
                                    </Button>
                                    <Button
                                        id='modify'
                                        variant="outlined"
                                        color='secondary'
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        Modify
                                    </Button>
                                    <Button
                                        id='accept'
                                        variant="contained"
                                        color='secondary'
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        Accept
                                    </Button>
                                </>
                            )}
                            {
                                !showChart ? (
                                    <Button
                                        id='details'
                                        variant="outlined"
                                        color='secondary'
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        RCA
                                        <FuseSvgIcon size={16} className='text-blue-500 cursor-pointer'>
                                            heroicons-outline:chevron-right
                                        </FuseSvgIcon>
                                    </Button>
                                ) : (
                                    <Button
                                        id='details'
                                        variant="outlined"
                                        color='secondary'
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        <FuseSvgIcon size={16} className='text-blue-500 cursor-pointer'>
                                            heroicons-outline:chevron-left
                                        </FuseSvgIcon>
                                        Back
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mt-20 h-full flex flex-col gap-10 h-[500px]'>
                {!showChart && (
                    <Paper className='w-full border p-10 h-full flex flex-col' style={{height: 680}}>
                        <div className='text-lg font-medium tracking-tight leading-6'>
                            Root Cause Analysis
                        </div>
                        <div className=' h-full ' id="chartdiv" style={{width: "100%", height: "100%"}}/>
                    </Paper>
                )}
                {showChart && (
                    <div className='w-full h-full ag-theme-quartz' style={{height: 680}} color='secondary'>
                        <AgGridReact
                            rowData={rowData}
                            pagination={true}
                            suppressMenuHide={true}
                            paginationPageSize={100}
                            autoSizeStrategy={autoSizeStrategy}
                            rowSelection={"single"}
                            onGridReady={onGridReady}
                            columnDefs={colDefs}
                            onSelectionChanged={handleRowSelection}
                        />
                    </div>
                )}
                <div>
                    <BootstrapDialog open={openDialog} onClose={handleCloseDialog}
                                     className="hidden sm:flex items-center justify-center text-white"
                                     aria-labelledby="customized-dialog-title"
                                     scroll="body" PaperProps={{
                        sx: {minWidth: "28vw", maxWidth: "60vw"}
                    }}>
                        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                            Rejection Reason
                        </DialogTitle>
                        <form onSubmit={handleSaveSelection} className="flex flex-col">
                            <DialogContent classes={{root: 'p-16 pb-0 sm:p-32 sm:pb-0'}} dividers>
                                    <div className="flex flex-col justify-center items-center gap-4">
                                    <FormControl fullWidth sx={{width: '100%', height: "20vh", display: "flex" , justifyContent: "center", alignItems: 'center'}}>
                                        <TextField
                                            className='w-full h-full'
                                            id="standard-multiline-static"
                                            label="Description"
                                            multiline
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            minRows={8}
                                            placeholder='Please provide a valid description'
                                        />
                                    </FormControl>
                                </div>
                            </DialogContent>
                            <DialogActions className="flex sm:flex-row   sm:py-24 px-24">
                                <Button color="primary" variant="outlined"
                                        onClick={handleCloseDialog}>Close</Button>
                                <Button type="submit" color="primary" variant="outlined"
                                        className=" ml-8">Submit</Button>
                            </DialogActions>
                        </form>
                    </BootstrapDialog>
                </div>
            </div>
        </div>
    );
}

export default RecommendationPageContent;
