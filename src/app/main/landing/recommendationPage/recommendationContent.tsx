import React, {useEffect, useMemo, useState, useLayoutEffect, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
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
/**
 * RecommendationPage Content
 */
function RecommendationPageContent() {
    console.log(useParams())


    const cardData  = {
        title: 'Transfer 199,597 units of 1004 to the L04 DC to fill projected backorders in 2024-06-16',
        date: 'May20, 2024',
        description: "Area's demand is forecast is projecting a backlog of 199,597 units vs the current consensus plan for 2024-06-16 in L04 DC. Based on available inventory in the L02 DC, we are able to cover" +
            "100% of this unmet demand. This is expected to drive $429k in additional revenue, with a cost of $15,968"
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




    return (
        <div className="flex-auto p-24 flex w-full justify-between flex-row'">
            <div className="w-2/5 flex" >
                {/*<div className='m-5 flex w-full justify-between flex-row'>*/}
                {/*<FuseSvgIcon size={24} className='text-blue-500'>heroicons-outline:arrow-narrow-right</FuseSvgIcon>*/}
                <div
                    className="card mt-20  w-full h-2/4 border relative cursor-pointer flex lg:flex-col md:flex-row sm:flex-row  shadow bg-white  rounded-2xl overflow-hidden">
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
                    <div className="flex justify-between gap-10  w-full h-full flex-col">
                        <div
                            className="text-md font-medium md:mr-24 text-grey-700  md:ml-24 ">{cardData.description}
                        </div>
                        <div
                            className="flex m-20 justify-center gap-32 items-center"
                            color="text.secondary"
                        >
                                    <Button variant="outlined"  color='secondary'  size="small">Dismiss</Button>
                                    <Button variant="outlined" color='secondary'   size="small">Modify</Button>
                                    <Button variant="contained" color='secondary'   size="small">Accept</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                {/*<AgGridReact*/}
                {/*    rowData={rowData}*/}
                {/*    pagination={true}*/}
                {/*    paginationPageSize={100}*/}
                {/*    filter={true}*/}
                {/*    paginationPageSizeSelector={paginationPageSizeSelector}*/}
                {/*    columnDefs={colDefs}*/}
                {/*    onRowClicked={handleRowClick}*/}
                {/*/>*/}

                <div id="chartdiv" style={{width: "100%", height: "500px"}}/>
            </div>
        </div>
    );
}

export default RecommendationPageContent;
