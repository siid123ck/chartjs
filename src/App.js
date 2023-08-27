import React, {useEffect, useState } from 'react'
import './App.css'
import { Data } from './utils/Data'
import PieChart from './components/PieChart'
import { CategoryScale, Chart } from 'chart.js'
import LineChart from './components/LineChart'
import { ethers } from 'ethers'

Chart.register(CategoryScale)

const App = () => {
  const [baseFees, setBaseFees] = useState([])
  const [gasRatios, setGasRatios] = useState([])


  useEffect(()=>{
    const fetchBaseFeeAndGasUsage = async ()=>{
      if(window.ethereum){
        const baseFees = [];
        const gasRatios = [];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const blockNumber = await provider.getBlockNumber();
        for (let i = blockNumber-10; i < blockNumber; i++) {
          const block = await provider.getBlock(i);
          const baseFee = Number(block.baseFeePerGas);
          baseFees.push(baseFee);

          const gasUsed = block.gasUsed;
          const gasLimit = block.gasLimit;
          const gasRatio = (Number(gasUsed)/Number(gasLimit))*100;
          gasRatios.push({blockNumber:i, gasRatio});
        }
        setBaseFees(baseFees);
        setGasRatios(gasRatios)
        
      } else{
        console.log('metamask is not installed')
      }
    }
    fetchBaseFeeAndGasUsage();
  }, [])

  return (
    <div className='container'>
      {gasRatios.length && <LineChart gasRatios={gasRatios}  />}
    </div>
  )
}

export default App