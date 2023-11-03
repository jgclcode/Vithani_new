import React from 'react'
import ReactEcharts from "echarts-for-react";

export const DistributorSalesBarGraph = ({dataGraph}) => {
    

    const option = {
        title: {
          left: 'center',
          text: 'Ventas de Distribuidores',
        },
        color: ["#5C94ED"],
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
            }
        ]
    }; 
    
    return (
        <ReactEcharts option={option} />
    )
}