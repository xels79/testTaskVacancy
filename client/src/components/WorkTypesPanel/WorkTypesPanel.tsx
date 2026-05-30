import { Button, Card, Col, Row } from "react-bootstrap"
import WorkTypesForm from "./WorkTypesForm"
import { useEffect, useState } from "react";
import WorkTapesTable from "./WorkTapesTable";
import correctUrl from "../../helplers/correctUrl";
import IWorkTypes from "../../interfaces/IWorkTypes";
import WarningDialog from "../WarningDialog/WarningDialog";

function WorkTypesPanel(){
    const [showAdd, setShowAdd] = useState(false);
    const [pending, setPending] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [items, setItems] = useState<IWorkTypes[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const handleShow = ()=>{setShowAdd(true); setUpdateFlag(!updateFlag);}
    const handleClose = ()=>{
        setShowAdd(false);
        if (selectedIndex){
            setSelectedIndex(0);
        }
        setUpdateFlag(!updateFlag);
    }
    const proceedDeleting = ()=>{
        setShowWarning(false);
        setPending(true);
        fetch(correctUrl(`/rest/work-types/${selectedIndex}`), {
            method:'delete'
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
        })
        .finally(()=>setUpdateFlag(!updateFlag));
        setSelectedIndex(0);
    }
    const deleteAction = (index: number)=>{
        setSelectedIndex(index);
        setShowWarning(true);
    }
    const updateAction = (index: number)=>{
        setSelectedIndex(index);
        setShowAdd(true);
    }
    useEffect(()=>{
        const url = correctUrl('/rest/work-types');
        setPending(true);
        fetch(url, { 
            method:"get",
            // headers: { 'Content-Type': 'application/json' },
        })
        .then(response=>response.json())
        .then(data=>{
            setItems(data);
            setPending(false);
        })
        .catch(err=>{
            console.error(err);
        });
    }, [ updateFlag ]);
    return (<><Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={handleShow} size='sm'>
                            Добавить
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3">
                        <WorkTapesTable
                            items={items}
                            pending={pending}
                            updateClick={updateAction}
                            deleteClick={deleteAction}
                        />
                    </Col>
                </Row>
                {showAdd && <WorkTypesForm doClose={handleClose} index={selectedIndex}/>}
            </Card.Body>
        </Card>
        {showWarning && <WarningDialog 
            title="Внимание"
            message="Удалить запись?"
            doActionCancel={ () => {
                setShowWarning(false);
                setSelectedIndex(0);
            } }
            doActionConfirm={ proceedDeleting }
        />}
    </>)
}
export default WorkTypesPanel