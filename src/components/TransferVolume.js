import { Chart, LinearScale, PointElement, LineElement } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, PointElement, LineElement)

function TransferVolume({ transferVolume }) {
  const chartData = {
    labels: transferVolume.map(item => item.blockNumber),
    datasets: [
      {
        label: 'Total transfer volume',
        data: transferVolume.map(data => data.volume),
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
      <h2 style={{ textAlign: "center" }}>Line Chart for Total volume of transfers</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total volume of transfers on blocks"
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
               text:'Total volume',
               color:'green'
             }
           }
          }
        }}
      />
    </div>
  );
}
export default TransferVolume;