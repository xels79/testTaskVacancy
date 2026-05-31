import { Button, Card, Col, Row } from "react-bootstrap"
import WorkTypesForm from "./WorkTypesForm"
import { useContext, useEffect, useState } from "react";
import WorkTapesTable from "./WorkTapesTable";
import correctUrl from "../../helplers/correctUrl";
import IWorkTypes from "../../interfaces/IWorkTypes";
import './WorkTypesPanel.scss';
import IFilters, { IPager } from "../../interfaces/IFilters";
import PagerContext from "../../contexts/PagerContext";
import IServerMessage from "../../interfaces/IServerMessage";
import { DialogContext } from "../../contexts/DialogContext";

const getListWithFilters = async( filters: IFilters ): Promise<IWorkTypes[]> => {
    const param = new URLSearchParams( filters as unknown as Record<string, string> ).toString();
    const url = correctUrl( '/rest/work-types' );
    return await fetch(`${url}?${param}`).then( response => response.json() ).catch(error=>console.error(error));
}

function WorkTypesPanel(){
    const { showDialog, hideDialog } = useContext(DialogContext);
    const [pagerData, setPagerData] = useState<IPager>({ page:  0, pageCount: 0, pageSize: 10});
    const setPage = ( page: number ) => setPagerData( { ...pagerData, ...{ page } } );
    const setPageCount = ( pageCount: number ) => setPagerData( { ...pagerData, ...{ pageCount } } );
    const setPageSize = ( pageSize: number ) => setPagerData( { ...pagerData, ...{ pageSize } } );

    const [showAdd, setShowAdd] = useState(false);
    const [pending, setPending] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [items, setItems] = useState<IWorkTypes[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleShow = ()=>{setShowAdd(true); setUpdateFlag(!updateFlag);}
    const handleClose = ()=>{
        setShowAdd(false);
        if (selectedIndex){
            setSelectedIndex(0);
        }
        setUpdateFlag(!updateFlag);
    }
    const proceedDeleting = (index: number)=>{
        hideDialog();
        console.log("proceed removing");
        setPending(true);
        fetch(correctUrl(`/rest/work-types/${index}`), {
            method:'delete'
        })
        .then(response=>response.json())
        .then(data=>{
            const tmp = data as IServerMessage;
            showDialog({
                title:'Информация',
                message:tmp.message,
                doActionCancel() {
                    hideDialog();
                },
                doActionConfirm:false,
                cacelText:'Закрыть'
            });
            console.log(data);
        })
        .finally(()=>{
            setUpdateFlag(!updateFlag);
            setPending(false);
        });
        
    }
    const deleteAction = (index: number)=>{
        showDialog({
            title:"Внимание",
            message:"Удалить запись?",
            doActionCancel: () => {
                hideDialog();
                setSelectedIndex(0);
            },
            doActionConfirm: ()=>proceedDeleting(index)
        });
    }
    const updateAction = (index: number)=>{
        setSelectedIndex(index);
        setShowAdd(true);
    }
    useEffect(()=>{
        fetch( correctUrl('/rest/work-types/total'))
            .then(response=>response.text())
            .then(async result=>{
                const actualPageCount = Math.ceil( +result / pagerData.pageSize );
                if (pagerData.pageCount !== actualPageCount){
                    setPageCount( actualPageCount );
                    console.log('set list setPAge count', result, actualPageCount);
                }else{
                    const actualList = await getListWithFilters({ 
                        pageSize: pagerData.pageSize,
                        page: pagerData.page<actualPageCount?pagerData.page:(actualPageCount - 1)
                    });
                    setItems( actualList );
                    console.log('set list', actualList);
                }
            })
            .catch(_error=>console.error('Fetching error'));
    }, [pagerData.page, pagerData.pageSize, pagerData.pageCount, updateFlag]);

    return (<><Card style={{minHeight:'900px'}}>
            <Card.Body>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={handleShow} size='sm'>
                            Добавить
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3 work__types-list">
                        <PagerContext.Provider value={{
                            setPage,
                            setPageCount,
                            setPageSize
                        }}>
                            <WorkTapesTable
                                items={items}
                                pending={pending}
                                updateClick={updateAction}
                                deleteClick={deleteAction}
                                { ...pagerData }
                            />
                        </PagerContext.Provider>
                    </Col>
                </Row>
                {showAdd && <WorkTypesForm doClose={handleClose} index={selectedIndex}/>}
            </Card.Body>
        </Card>
    </>)
}
export default WorkTypesPanel