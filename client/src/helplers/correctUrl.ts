import IFilters from "../interfaces/IFilters";

const correctUrl = (url:string):string=>`${window.location.origin}${url}`;
export const correctUrlFiltersQuery = (url: string, filters: IFilters):string => {
    const rVal:string[] = [];
    Object.keys(filters).map(item=>{
        const key = item as keyof IFilters
        const uriKey = key.split(/(?=[A-Z])/).map(it=>it.toLowerCase()).join('-');
        rVal.push(`${uriKey}=${filters[key]}`);
    });
    
    return `${correctUrl( url )}?${rVal.join('&')}`;
}
export default correctUrl
