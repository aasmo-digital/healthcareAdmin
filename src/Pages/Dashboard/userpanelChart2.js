import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart2 = ({ series, color }) => {
    const radialoptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: [color || '#0ab39c'],
        stroke: {
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '70%'
                },
                track: {
                    margin: 0,
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 5,
                        show: true
                    }
                }
            }
        }
    };

    return (
        <ReactApexChart
            options={radialoptions}
            series={series}
            type="radialBar"
            height="72"
            width="72"
            className="apex-charts"
        />
    );
};

export default RadialChart2;
