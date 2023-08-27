import { createContext, useState } from "react";

const  ChartContext = createContext();


const ChartDataProvider = ({children}) =>{
    const [gasRatio, setGasRatios] = useState([]);

    
    return (
        <ChartContext.Provider>
            {children}
        </ChartContext.Provider>
    )
}

export default ChartDataProvider;