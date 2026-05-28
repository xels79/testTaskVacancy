export default interface IWorks {
  id?: number;
  workTypesID: number;
  state: 0 | 1 | 2 | 3;
  description?: string;
}
