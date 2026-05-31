import { useContext, useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import IWorks from "../../interfaces/IWorks";
import { correctUrlFiltersQuery } from "../../helplers/correctUrl";
import WorkTableList from "./WorkTableList";
import IFilters, { IFilterBase, IPager } from "../../interfaces/IFilters";
import PagerContext from "../../contexts/PagerContext";
import PginationBar from "../PginationBar/PginationBar";

interface IWorkTable  extends IPager{
    updaateFlag?:boolean,
    filters:IFilterBase,
    updateFlag: boolean
}

const getListWithFilters = async ( filters: IFilters ): Promise<IWorks[]> => {
    // const param = new URLSearchParams( filters as unknown as Record<string, string> ).toString();
    const url = correctUrlFiltersQuery( '/rest/works', filters );
    return await fetch(url).then( response => response.json() );
}

function WorkTable( { page, pageCount, pageSize, updaateFlag, filters, updateFlag }: IWorkTable ){
    const [list, setList] = useState<IWorks[]|undefined>();
    const { setPageCount, setPage } = useContext( PagerContext );
    useEffect( () => {
        fetch( correctUrlFiltersQuery(`/rest/works/total`, filters as IFilters) )
            .then(response=>response.text())
            .then(async result=>{
                const actualPageCount = Math.ceil( +result / pageSize );
                if (pageCount !== actualPageCount){
                    setPageCount( actualPageCount );
                    console.log('set list setPAge count', result, actualPageCount);
                }else if( page >= pageCount ){
                    setPage(pageCount - 1);
                }else{
                const actualList = await getListWithFilters({...{ 
                    pageSize,
                    page: page<actualPageCount?page:(actualPageCount - 1),  
                }, ...filters});
                    setList( actualList );
                    console.log('set list', actualList);
                }
            })
            .catch(_error=>console.error('Fetching error'));
    }, [ page, pageSize, pageCount, updaateFlag, filters, updateFlag ]);
    return <Card border="success" className="mt-2">
        <Card.Body>
            <Table className="work__list">
                <thead className="first__td-32">
                    <tr><th>#</th><th>Исполнитель</th><th>Работа</th><th>Колич.</th><th>Дата выполн.</th><th></th></tr>
                </thead>
                <tbody><tr><td colSpan={6} style={{margin:0, padding:0}}>
                    {!list ?<Spinner animation="border" />
                           :<WorkTableList list={list} page={page} pageSize={pageSize}/>
                    }
                </td></tr></tbody>
                <tfoot><tr><td colSpan={6}><PginationBar
                    page={page}
                    pageCount={pageCount}
                    pageSize={pageSize}
                /></td></tr></tfoot>
            </Table>
        </Card.Body>
    </Card>
}

export default WorkTable;