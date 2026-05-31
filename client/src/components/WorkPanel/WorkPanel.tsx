import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import WorkAddForm from "./WorkAddForm";
import WorkFilters from "./WorkFilters";
import WorkTable from "./WorkTable";
import PagerContext from "../../contexts/PagerContext";
import { IPager } from "../../interfaces/IFilters";
import './WorkPanel.scss';


function WorkPanel(){
    const [pagerData, setPagerData] = useState<IPager>({ page:  0, pageCount: 0, pageSize: 10});
    const setPage = ( page: number ) => setPagerData( { ...pagerData, ...{ page } } );
    const setPageCount = ( pageCount: number ) => setPagerData( { ...pagerData, ...{ pageCount } } );
    const setPageSize = ( pageSize: number ) => setPagerData( { ...pagerData, ...{ pageSize } } );
    return <>
        <Card>
            <Card.Body>
                <Card>
                    <PagerContext.Provider value={{
                        setPage,
                        setPageCount,
                        setPageSize
                    }}>
                        <ListGroup variant="flush"><WorkAddForm pageCount={ pagerData.page }/></ListGroup>
                        <ListGroup variant="flush"><WorkFilters /></ListGroup>
                        <ListGroup variant="flush"><WorkTable { ...pagerData }/></ListGroup>
                    </PagerContext.Provider>
                </Card>
            </Card.Body>
        </Card>
    </>
}

export default WorkPanel;