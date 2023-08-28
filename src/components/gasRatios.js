import { Chart, LinearScale, PointElement, LineElement } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, PointElement, LineElement)

function GasRatios({ gasRatios }) {
  const chartData = {
    labels: gasRatios.map(item => item.blockNumber),
    datasets: [
      {
        label: 'Gas Ratios',
        data: gasRatios.map(data => data.gasRatio),
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
      <h2 style={{ textAlign: "center" }}>Line Chart for Gas ratios</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Gas ratios: use of gas over limit of gas"
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
export default GasRatios;