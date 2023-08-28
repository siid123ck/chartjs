import {ethers} from 'ethers'
import { createContext, useEffect, useState } from "react";

export const  ChartContext = createContext();

const CONTRACT_ADDRESS = '0x8059B0AE35c113137694Ba15b2C3585aE77Bb8E9'
// const ERC20 = '0xdAC17F958D2ee523a2206206994597C13D831ec7;'

const ChartDataProvider = ({children}) =>{
  const [baseFees, setBaseFees] = useState([])
  const [gasRatios, setGasRatios] = useState([])
  const [transferVolume, setTransferVolume] = useState([])

  useEffect(()=>{
    const fetchBaseFeeAndGasUsage = async ()=>{
      if(window.ethereum){
        const transferVolume = [];
        const baseFees = [];
        const gasRatios = [];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const blockNumber = await provider.getBlockNumber();
        for (let i = blockNumber-10; i < blockNumber; i++) {
          const block = await provider.getBlock(i, true);

          const transfers =  block.prefetchedTransactions.filter(tx=>tx.to !== CONTRACT_ADDRESS)
          const volume = transfers.reduce((acc, tx)=> acc + Number(tx.value), 0);
          transferVolume.push({blockNumber:i, volume});

          const baseFee = Number(block.baseFeePerGas);
          baseFees.push({blockNumber:i, baseFee});

          const gasUsed = block.gasUsed;
          const gasLimit = block.gasLimit;
          const gasRatio = (Number(gasUsed)/Number(gasLimit))*100;
          gasRatios.push({blockNumber:i, gasRatio});
        }
        setBaseFees(baseFees);
        setGasRatios(gasRatios)
        setTransferVolume(transferVolume);
        
      } else{
        console.log('metamask is not installed')
      }
    }
    fetchBaseFeeAndGasUsage();
  }, [])
    return (
        <ChartContext.Provider value={{transferVolume, gasRatios, baseFees}}>
            {children}
        </ChartContext.Provider>
    )
}

export default ChartDataProvider;