import React, {useContext, useEffect, useState } from 'react'
import './App.css'
import PieChart from './components/PieChart'
import { CategoryScale, Chart } from 'chart.js'
import LineChart from './components/LineChart'
import { ChartContext } from './contextApi/ChartData'

Chart.register(CategoryScale)

const App = () => {
  const {baseFees} = useContext(ChartContext);

  const [chartData, setChartData] = useState({})

    useEffect(() => {
    setChartData({
      labels: baseFees.map(item => item.blockNumber),
      datasets: [
        {
          label: 'User gained',
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
    });
  }, [baseFees]); 

  return (
    <div className='container'>
      {baseFees.length && <LineChart chartData={chartData}  />}
      {baseFees.length && <PieChart chartData={chartData}  />}
    </div>
  )
}

export default App