import { Table } from "react-bootstrap";
import IWorks from "../../interfaces/IWorks";
import capitalizeFIO from "../../helplers/capitalize";

interface IWorkTableList{
    list: IWorks[],
    page: number,
    pageSize: number
}

const computeOrdinal = ( index:number, page:number, pageSize:number ) => page * pageSize + index + 1;

function WorkTableList( { list, page, pageSize }: IWorkTableList ){
    return <div className="scrollable my-scroll">
        <Table bordered striped hover className="mb-0 work__list">
            <tbody className="first__td-32">
                {list.map( (item, index)=><tr key={`WTBL-${index}`}>
                    <td className="align-middle">{ computeOrdinal( index, page, pageSize ) }</td>
                    <td>{ capitalizeFIO( item.fio ) }</td>
                    <td>{item.workType?.workName}</td>
                    <td>{ new Date( item.dateOfCompletion ).toLocaleDateString() }</td>
                </tr> )}
            </tbody>
        </Table>
    </div>
}

export default WorkTableList;