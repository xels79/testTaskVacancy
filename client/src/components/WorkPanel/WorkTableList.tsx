import { Button, Table } from "react-bootstrap";
import IWorks from "../../interfaces/IWorks";
import capitalizeFIO from "../../helplers/capitalize";
import { TrashFill } from "react-bootstrap-icons";
import { useContext, useState } from "react";
import { DialogContext } from "../../contexts/DialogContext";
import correctUrl from "../../helplers/correctUrl";
import IServerMessage from "../../interfaces/IServerMessage";
import WorkPanelContext from "./WorkPanelContext";

interface IWorkTableList{
    list: IWorks[],
    page: number,
    pageSize: number
}

const computeOrdinal = ( index:number, page:number, pageSize:number ) => page * pageSize + index + 1;

function WorkTableList( { list, page, pageSize }: IWorkTableList ){
    const { showDialog, hideDialog } = useContext( DialogContext );
    const { setUpdateFlag } = useContext( WorkPanelContext );
    const [selectedID, setSelectedID] = useState(-1);
    const proceedDeletOnr = (index: number)=>{
        hideDialog();
        console.log("proceed removing");
        fetch(correctUrl(`/rest/works/${index}`), {
            method:'delete'
        })
        .then(response=>response.json())
        .then(data=>{
            const tmp = data as IServerMessage;
            if (tmp.message){
                showDialog({
                    title:'Информация',
                    message:tmp.message,
                    doActionCancel() {
                        hideDialog();
                    },
                    doActionConfirm:false,
                    cacelText:'Закрыть'
                });
            }
            console.log(data);
        })
        .finally(()=>{
            setUpdateFlag();
        });
    }
    const onDeleetePress = ( item: IWorks ) => {
        setSelectedID(item.id?+item.id:0)
        showDialog({
            message: `Удалить запись: ${item.fio} - "${item.workType?.workName}" к ${new Date(item.dateOfCompletion).toLocaleDateString()}`,
            doActionCancel() {
                hideDialog();
                setSelectedID(-1);
            },
            doActionConfirm() {
                hideDialog();
                setSelectedID(-1);
                proceedDeletOnr(item.id?+item.id:0);
            }
        });
    }
    return <div className="scrollable__small scrollable my-scroll">
        <Table bordered striped hover className="mb-0 work__list">
            <tbody className="first__td-32">
                {list.map( (item, index)=><tr className={(item.id?+item.id:-1) == selectedID?"active":""} key={`WTBL-${index}`}>
                    <td className="align-middle">{ computeOrdinal( index, page, pageSize ) }</td>
                    <td>{ capitalizeFIO( item.fio ) }</td>
                    <td>{item.workType?.workName}</td>
                    <td>{`${item.volume} ${item.uoMeasurement}`}</td>
                    <td>{ new Date( item.dateOfCompletion ).toLocaleDateString() }</td>
                    <td>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-1"
                            title="Удалить"
                            onClick={ () => onDeleetePress( item ) }
                        ><TrashFill/></Button>
                    </td>
                </tr> )}
            </tbody>
        </Table>
    </div>
}

export default WorkTableList;