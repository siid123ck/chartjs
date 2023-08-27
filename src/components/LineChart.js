import { Chart, LinearScale, PointElement, LineElement } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, PointElement, LineElement)
function LineChart({ gasRatios }) {

    const [chartData, setChartData] = useState({
        labels: gasRatios.map(item=>item.blockNumber),
        datasets:[
          {
            label:'User gained',
            data:gasRatios.map(data=>data.gasRatio),
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
      })
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;