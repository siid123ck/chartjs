import {ethers} from 'ethers'
import { createContext, useEffect, useState } from "react";

export const  ChartContext = createContext();


const ChartDataProvider = ({children}) =>{
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
          baseFees.push({blockNumber:i, baseFee});

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
        <ChartContext.Provider value={{gasRatios, baseFees}}>
            {children}
        </ChartContext.Provider>
    )
}

export default ChartDataProvider;