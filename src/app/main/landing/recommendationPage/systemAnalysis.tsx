import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useTheme} from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import axios from "axios";


function SystemAnalysis() {

    const savedData = localStorage.getItem('recommendationData');
    const [recommendation, setData] = React.useState<any>(JSON.parse(savedData));
    const [systemData, setSystemRecommendation] = useState([])

    const fetchRecommendations = async () => {
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/system_recommendations?id=${recommendation.material_code}`);
        setSystemRecommendation(response.data.data)
    }

    useEffect(() => {
        fetchRecommendations()
    }, []);

    useTheme(am4themes_animated);
    let acceptValue = 0;
    let rejectValue = 0;
    let acceptReasonCounts = {};
    let rejectReasonCounts = {};
    systemData.forEach(item => {
        if (item.decision === 'Accept') {
            acceptValue++;
            if (item.RCA in acceptReasonCounts) {
                acceptReasonCounts[item.RCA]++;
            } else {
                acceptReasonCounts[item.RCA] = 1;
            }
        } else if (item.decision === 'Reject') {
            if (item.RCA in rejectReasonCounts) {
                rejectReasonCounts[item.RCA]++;
            } else {
                rejectReasonCounts[item.RCA] = 1;
            }
        }
    });
    const createReasonObject = (reasonCounts, type) => {
        const reasonObjects = {};
        Object.keys(reasonCounts).forEach((reason, index) => {
            reasonObjects[`${type.toLowerCase()}Reason${index + 1}`] = reason;
            reasonObjects[`${type.toLowerCase()}Value${index + 1}`] = reasonCounts[reason];
        });
        return reasonObjects;
    };
    const data = [
        {
            category: 'Accept',
            acceptValue,
            ...createReasonObject(acceptReasonCounts, 'Accept')
        },
        {
            category: 'Reject',
            rejectValue,
            ...createReasonObject(rejectReasonCounts, 'Reject')
        }
    ];

    useLayoutEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = data;
        chart.logo.dispose();
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.title.text = "Action";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Count";

        let series = []; // Array to hold all series for drill-down

        let suffixes = [];
        Object.keys(data[1]).forEach(key => {
            if (key.includes("Value")) {
                let suffix = key.replace(/[^0-9]/g, ''); // Extract numeric part of the key
                if (!suffixes.includes(suffix)) {
                    suffixes.push(suffix);
                }
            }
        });

        let acceptSeries = chart.series.push(new am4charts.ColumnSeries());
        acceptSeries.dataFields.valueY = "acceptValue";
        acceptSeries.dataFields.categoryX = "category";
        // acceptSeries.name = "Accept";
        acceptSeries.stacked = true;
        acceptSeries.columns.template.tooltipText = "Accept: {valueY.value}";
        acceptSeries.columns.template.width = am4core.percent(30);
        series.push(acceptSeries);

        suffixes.forEach(suffix => {
            let rejectSeries = chart.series.push(new am4charts.ColumnSeries());
            rejectSeries.dataFields.valueY = `rejectValue${suffix}`;
            rejectSeries.dataFields.categoryX = "category";
            rejectSeries.columns.template.tooltipText = `Reject: {valueY.value}\nReason: {rejectReason${suffix}}`;
            // rejectSeries.name = `Reject - Reason ${suffix}`;
            rejectSeries.stacked = true;
            rejectSeries.columns.template.width = am4core.percent(30);
            series.push(rejectSeries);
        });

        chart.legend = new am4charts.Legend();
        return () => {
            chart.dispose();
        };
    }, [systemData]);

    return (
        <div id="chartdiv" style={{width: "100%", height: "500px"}}></div>
    )
}

export default SystemAnalysis;
