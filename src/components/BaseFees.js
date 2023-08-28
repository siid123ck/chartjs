import { Chart, LinearScale, PointElement, LineElement } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, PointElement, LineElement)

function BaseFees({ baseFees }) {
  const chartData = {
    labels: baseFees.map(item => item.blockNumber),
    datasets: [
      {
        label: 'Total base fee per block',
        data: baseFees.map(data => data.baseFee),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#19AF05",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart for Base Fees</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Base calculated"
            },
            legend: {
              display: false
            }
          },
          scales:{
           x:{
             title:{
               display:true,
               text:'Block Number',
               color:'blue'
             }
           },
           y:{
             title:{
               display:true,
               text:'Base Fees',
               color:'green'
             }
           }
          }
          
        }}
      />
    </div>
  );
}
export default BaseFees;