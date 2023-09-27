import React from 'react'
import ReactEcharts from "echarts-for-react";

export const YearBarGraph = ({dataGraph}) => {
    

    const option = {
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
                type: 'bar'
            }
        ]
    }; 
    
    return (
        <ReactEcharts option={option} />
    )
}
