import React, {useContext } from 'react'
import './App.css'
import { CategoryScale, Chart } from 'chart.js'
import { ChartContext } from './contextApi/ChartData'
import TransferVolume from './components/TransferVolume'
import BaseFees from './components/BaseFees'
import GasRatios from './components/gasRatios'

Chart.register(CategoryScale)

const App = () => {
  const {transferVolume, gasRatios, baseFees} = useContext(ChartContext);
  
  return (
    <div className='container'>
      {transferVolume.length && <TransferVolume transferVolume={transferVolume}  />}
      {baseFees.length && <BaseFees baseFees={baseFees} />}
      {gasRatios.length && <GasRatios gasRatios={gasRatios} />}
    </div>
  )
}

export default App