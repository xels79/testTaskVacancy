export interface IPager{
    page: number,
    pageSize: number,
    pageCount: number
}
export interface IFilterBase{
    dateCompleteon?: number,
    entriesBefore?: boolean
}
export default interface IFilters extends Omit<IPager, "pageCount">, IFilterBase{}