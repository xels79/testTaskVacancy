import { Button, Card, Spinner, Table } from "react-bootstrap";
import IWorkTypes from "../../interfaces/IWorkTypes";
import * as Icon from 'react-bootstrap-icons';
interface IWorkTapesTable{
    items:IWorkTypes[],
    pending: boolean,
    deleteClick?: (index: number)=>void,
    updateClick?: (index: number)=>void
}

function WorkTapesTable({ 
    items,
    pending,
    updateClick = (i)=>console.log(`Update for (${i}) clicked`),
    deleteClick = (i)=>console.log(`Delete for (${i}) clicked`)
}: IWorkTapesTable){
return <Table>
    <thead>
        <tr>
            <th>#</th>
            <th>Название работы</th>
        </tr>
    </thead>
    <tbody><tr>
        {pending ? <td colSpan={2} className="text-center"><Spinner animation="border" /></td>
        :( items.length ? <td colSpan={2} style={{margin:0, padding:0}} >
            <div className="scrollable my-scroll">
                <Table bordered striped hover className="mb-0">
                    <tbody>{items.map((item, index)=>
                        <tr key={`ttr${index}`}>
                            <td className="align-middle">{index}</td>
                            <td className="p-0">
                                <Card className="bg-transparent rounded-0 border-0">
                                    <Card.Body>
                                        <Card.Title >{item.workName}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </td>
                            <td className="align-middle">
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    onClick={()=>updateClick(item.id?item.id:0)}
                                ><Icon.PenFill/></Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="ms-1"
                                    onClick={()=>deleteClick(item.id?item.id:0)}
                                ><Icon.TrashFill/></Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </td>
        :<td colSpan={2} className="text-center">Пусто</td>)}
    </tr></tbody>
    <tfoot></tfoot>
</Table>
}

export default WorkTapesTable;