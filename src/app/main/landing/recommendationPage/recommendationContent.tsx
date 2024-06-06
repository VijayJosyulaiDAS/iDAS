import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import TextField from "@mui/material/TextField";
import {Controller, useFormContext} from "react-hook-form";
import {InputLabel, TextareaAutosize} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/base";
/**
 * RecommendationPage Content
 */

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function RecommendationPageContent(props) {
    // const [recommendation, setRecommendation] = React.useState<any>(props.recommendation);
    const savedData = localStorage.getItem('recommendationData');
    const [recommendation, setData] = React.useState<any>(JSON.parse(savedData));
    const [openDialog, setOpenDialog] = useState(true);


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

    const cardData  = {
        title: recommendation.description,
        date: formatDateString(recommendation.due_date),
        description: "The Demand Forecast is predicting an <increase/decrease> in Demand of <Demand Increase/Decrease Value> for the plan of <Time Frame> for the Material Code <Material Code>. Based on the available inventory of <Available Inventory Value> and a <Stock Transfer Time/Lead Time> " +
            "of <Number> days, you should <place an order/amend PO number> with the Quantity <Quantity Value>"
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    const handleSaveSelection = async (e) => {
        e.preventDefault();
        setOpenDialog(false)
    }

    const chartRef = useRef<am4charts.XYChart | null>(null);

    useLayoutEffect(() => {
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        chartRef.current = chart;
        chart.data = [
            { "date": "2024-06-13", "currentPlan": 102497, "currentForecast": 100000, "acmeForecast": 100000, "projectedInventory": 100000 },
            { "date": "2024-06-14", "currentPlan": 85461, "currentForecast": 50000, "acmeForecast": 110000, "projectedInventory": 0 },
            { "date": "2024-06-15", "currentPlan": 91224, "currentForecast": 100000, "acmeForecast": 120000, "projectedInventory": 123000 },
            { "date": "2024-06-16", "currentPlan": 95051, "currentForecast": 200000, "acmeForecast": 130000, "projectedInventory": 0 },
            { "date": "2024-06-17", "currentPlan": 94021, "currentForecast": 250000, "acmeForecast": 140000, "projectedInventory": 0 },
            { "date": "2024-06-18", "currentPlan": 94309, "currentForecast": 300000, "acmeForecast": 150000, "projectedInventory": -100000 },
            { "date": "2024-06-19", "currentPlan": 96509, "currentForecast": 275000, "acmeForecast": 160000, "projectedInventory": -150000 },
            { "date": "2024-06-20", "currentPlan": 89193, "currentForecast": 250000, "acmeForecast": 170000, "projectedInventory": -150000 },
            { "date": "2024-06-21", "currentPlan": 103332, "currentForecast": 200000, "acmeForecast": 180000, "projectedInventory": -150000 },
            { "date": "2024-06-22", "currentPlan": 93290, "currentForecast": 100000, "acmeForecast": 190000, "projectedInventory": -150000 },
            { "date": "2024-06-23", "currentPlan": 88969, "currentForecast": 0, "acmeForecast": 200000, "projectedInventory": -50000 },
            { "date": "2024-06-24", "currentPlan": 9574, "currentForecast": 0, "acmeForecast": 0, "projectedInventory": -50000 },
            { "date": "2024-06-25", "currentPlan": 0, "currentForecast": 0, "acmeForecast": 0, "projectedInventory": 0 },
            { "date": "2024-06-26", "currentPlan": 0, "currentForecast": 0, "acmeForecast": 0, "projectedInventory": 0 }
        ];

        // Create date axis
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.dateFormats.setKey("day", "dd-MMM");

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series for Acme Forecast
        let acmeSeries = chart.series.push(new am4charts.LineSeries());
        acmeSeries.name = "Acme Forecast";
        acmeSeries.dataFields.valueY = "acmeForecast";
        acmeSeries.dataFields.dateX = "date";
        acmeSeries.strokeWidth = 2;
        acmeSeries.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        // Add bullets (points) to Acme Forecast
        let acmeBullet = acmeSeries.bullets.push(new am4charts.Bullet());
        let acmeCircle = acmeBullet.createChild(am4core.Circle);
        acmeCircle.radius = 5;
        acmeCircle.fill = am4core.color("#fff");
        acmeCircle.strokeWidth = 2;

        // Create series for Current Forecast
        let currentSeries = chart.series.push(new am4charts.LineSeries());
        currentSeries.name = "Current Forecast";
        currentSeries.dataFields.valueY = "currentForecast";
        currentSeries.dataFields.dateX = "date";
        currentSeries.strokeWidth = 2;
        currentSeries.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        // Add bullets (points) to Current Forecast
        let currentBullet = currentSeries.bullets.push(new am4charts.Bullet());
        let currentCircle = currentBullet.createChild(am4core.Circle);
        currentCircle.radius = 5;
        currentCircle.fill = am4core.color("#fff");
        currentCircle.strokeWidth = 2;

        // Create series for Projected Inventory
        let inventorySeries = chart.series.push(new am4charts.ColumnSeries());
        inventorySeries.name = "Projected Inventory";
        inventorySeries.dataFields.valueY = "projectedInventory";
        inventorySeries.dataFields.dateX = "date";
        inventorySeries.columns.template.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        inventorySeries.columns.template.adapter.add("fill", function(fill, target) {
            return target.dataItem.values.valueY?.value < 0 ? am4core.color("#FF9999") : am4core.color("lightblue");
        });
        inventorySeries.columns.template.adapter.add("stroke", function(stroke, target) {
            return target.dataItem.values.valueY?.value < 0 ? am4core.color("#FF9999") : am4core.color("lightblue");
        });

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };
    }, []);

    const handleClick = (event) => {
        console.log(event.target.id);
    };



    return (
        <div className="flex-auto p-24 flex w-full justify-between flex-row'">
            <div className="w-2/5 flex">
                {/*<div className='m-5 flex w-full justify-between flex-row'>*/}
                {/*<FuseSvgIcon size={24} className='text-blue-500'>heroicons-outline:arrow-narrow-right</FuseSvgIcon>*/}
                <div
                    className=" mt-20 w-full max-h-auto border relative flex lg:flex-col md:flex-row sm:flex-row shadow bg-white rounded-2xl overflow-x-scroll"
                    style={{height: "70%"}}>
                    <div className="flex w-full items-start flex-col  justify-start px-8 pt-12">
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
                        <div
                            className="flex m-20  justify-center gap-32 items-center"
                            color="text.secondary">
                            <Button id='dismiss' variant="outlined" color='secondary' onClick={handleClick}
                                    size="small">Dismiss</Button>
                            <Button id='modify' variant="outlined" color='secondary' onClick={handleClick}
                                    size="small">Modify</Button>
                            <Button id='accept' variant="contained" color='secondary' onClick={handleClick}
                                    size="small">Accept</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                <div id="chartdiv" style={{width: "100%", height: "500px"}}/>

                <div>
                    {/* openDialog */}
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
                                        {/*<TextareaAutosize className='w-full border flex flex-auto rounded-2xl' aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />*/}
                                        <TextField
                                            className='w-full h-full'
                                            id="standard-multiline-static"
                                            label="Description"
                                            multiline
                                            minRows={5}
                                            defaultValue="Default Value"
                                        />
                                    </FormControl>
                                </div>
                            </DialogContent>
                            <DialogActions className="flex sm:flex-row   sm:py-24 px-24">
                                <Button color="primary" variant="outlined"
                                        onClick={handleCloseDialog}>Close</Button>
                                <Button type="submit" color="primary" variant="outlined"
                                        className=" ml-8">Create</Button>
                            </DialogActions>
                        </form>
                    </BootstrapDialog>
                </div>
            </div>
        </div>
    );
}

export default RecommendationPageContent;
