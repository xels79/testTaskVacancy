import { createContext } from "react";
import { IPager } from "../interfaces/IFilters";

export interface IPagerContext{
    setPage: ( p: number ) => void,
    setPageSize: ( p: number ) => void,
    setPageCount: ( p: number ) => void,
}

const PagerContext = createContext<IPagerContext>({
    setPage: (p:number)=>{console.log(`PagerContext.setPage(${p})`)},
    setPageSize: (p:number)=>{console.log(`PagerContext.setPageSize(${p})`)},
    setPageCount: (p:number)=>{console.log(`PagerContext.setPageCount(${p})`)},
});

export default PagerContext;