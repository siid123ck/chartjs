import { ArcElement, Chart } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

Chart.register(ArcElement)
const PieChart = ({chartData}) => {
  return (
    <div>
        <h2>Pie Chart</h2>
        <Pie 
        data={chartData}
        options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020"
              }
            }
          }}
         />
    </div>
  )
}

export default PieChart