export default interface IWorks {
  id?: number;
  workTypesID: number;
  state: 0 | 1 | 2 | 3;
  fio: string;
  dateOfCompletion:number|string,
  volume:number,
  uoMeasurement:'п.м.'|'кв.м.'|'куб.м.'|'шт.'|'час.'|'литры'
}
