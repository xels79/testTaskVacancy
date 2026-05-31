export interface IPager{
    page: number,
    pageSize: number,
    pageCount: number
}

export default interface IFilters extends Omit<IPager, "pageCount">{}