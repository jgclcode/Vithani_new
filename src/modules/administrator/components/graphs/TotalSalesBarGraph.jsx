import React from 'react'
import ReactEcharts from "echarts-for-react";

<<<<<<< HEAD:src/modules/administrator/components/graphs/TotalSalesBarGraph.jsx
export const TotalSalesBarGraph = ({dataGraph}) => {
    
=======
export const YearBarGraph = ({dataGraph, name, color}) => {

>>>>>>> ab0626cd52efc3385ef3655221cafac5c38fdd0a:src/modules/administrator/components/graphs/YearBarGraph.jsx

    const option = {
        title: {
          left: 'center',
<<<<<<< HEAD:src/modules/administrator/components/graphs/TotalSalesBarGraph.jsx
          text: 'Total de Ventas',
=======
          text: name,
>>>>>>> ab0626cd52efc3385ef3655221cafac5c38fdd0a:src/modules/administrator/components/graphs/YearBarGraph.jsx
        },
        color: ["#346BC1"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
          },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: dataGraph,
                type: 'bar',
                color: color
            }
        ]
    }; 
    
    return (
        <ReactEcharts option={option} />
    )
}