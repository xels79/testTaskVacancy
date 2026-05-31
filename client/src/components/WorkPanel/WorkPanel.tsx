import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import WorkAddForm from "./WorkAddForm";
import WorkFilters from "./WorkFilters";
import WorkTable from "./WorkTable";
import PagerContext from "../../contexts/PagerContext";
import { IFilterBase, IPager } from "../../interfaces/IFilters";
import './WorkPanel.scss';
import { WorkFiltersContext } from "../../contexts/WorkFiltersContext";
import WorkPanelContext from "./WorkPanelContext";


function WorkPanel(){
    const [pagerData, setPagerData] = useState<IPager>({ page:  0, pageCount: 0, pageSize: 10});
    const [updateFlag, setUpdateFlag] = useState(false);
    const [filters, setFilters] = useState<IFilterBase>({});
    const setPage = ( page: number ) => {
        setPagerData( { ...pagerData, ...{ page } } );
        setUpdateFlag( !updateFlag );
    }
    const setPageCount = ( pageCount: number ) => {
        setPagerData( { ...pagerData, ...{ pageCount } } );
        setUpdateFlag( !updateFlag );
    }
    const setPageSize = ( pageSize: number ) => {
        setPagerData( { ...pagerData, ...{ pageSize } } );
        setUpdateFlag( !updateFlag );
    }
    return <>
        <Card style={{minHeight:'900px'}}>
            <Card.Body>
                <Card>
                    <WorkPanelContext.Provider value={{ setUpdateFlag: () => setUpdateFlag( ( prev )=>!prev ) }}>
                        <PagerContext.Provider value={{
                            setPage,
                            setPageCount,
                            setPageSize
                        }}>
                            <WorkFiltersContext.Provider value={{setFilters}}>
                                <ListGroup variant="flush"><WorkAddForm pageCount={ pagerData.pageCount }/></ListGroup>
                                <ListGroup variant="flush"><WorkFilters /></ListGroup>
                                <ListGroup variant="flush"><WorkTable updateFlag={updateFlag} filters={filters} { ...pagerData }/></ListGroup>
                            </WorkFiltersContext.Provider>
                        </PagerContext.Provider>
                    </WorkPanelContext.Provider>
                </Card>
            </Card.Body>
        </Card>
    </>
}

export default WorkPanel;