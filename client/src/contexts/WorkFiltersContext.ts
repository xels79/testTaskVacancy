import { createContext } from "react";
import { IFilterBase } from "../interfaces/IFilters";


export interface IWorkFiltersContext{
    setFilters: ( filters: IFilterBase )=>void
}

export const WorkFiltersContext = createContext<IWorkFiltersContext>({
    setFilters: ( filters: IFilterBase ) => {}
});