import React from 'react'
import {Line,Doughnut,} from "react-chartjs-2"
import { 
Chart as ChartJS,
Tooltip,
Filler,
LinearScale,
PointElement,
LineElement,
ArcElement,
Legend,
CategoryScale,

} from "chart.js"
import { orange, orangeLight, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';



ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
);

const labels = getLast7Days();

const lineChartOptions ={
    responsive: true,
    plugins: {
        legend: {
          display:false,
        },
        title: {
            display: true,
            
        },
    },
    scales: {
        x: {
            grid:{
            display: false,
        },
    },
        y: {
            beginAtZero: true,
            grid:{
                display: false,
            },
        },
    },
};


const LineChart=({ value= [] })=> {
    const data={
        labels,
       datasets:[
        {
        data:value,
        label:"Revenue",
        fill:true,
        backgroundColor:purpleLight,
        borderColor:purple,
        borderWidth:1,
 
       },
    ]
    }
  return (
   <Line data={data} options={lineChartOptions }/>
  )
};

const  doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
          display:false,
        },
    },
    cutout: 120,
};

const DoughnutChart=({ value= [],labels = []})=> {
    const data={
        labels,
       datasets:[
        {
        data:value,
        backgroundColor:[purpleLight,orangeLight],
        hoverBackgroundColor:[purple,orange],
        borderColor:[purple,orange],
        offset: 20,
 
       },
    ]
    };
    return <Doughnut data={data} options={doughnutChartOptions} style={{zIndex:10}}/>
      
    
  }

export {LineChart,DoughnutChart}