import { useContext, useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import IWorks from "../../interfaces/IWorks";
import correctUrl from "../../helplers/correctUrl";
import WorkTableList from "./WorkTableList";
import IFilters from "../../interfaces/IFilters";
import PagerContext from "../../contexts/PagerContext";

interface IWorkTable{
    // updaateFlag?:boolean,
    page: number,
    pageSize: number,
    pageCount: number
}

const getListWithFilters = async ( filters: IFilters ): Promise<IWorks[]> => {
    const param = new URLSearchParams( filters as unknown as Record<string, string> ).toString();
    const url = correctUrl( '/rest/works' );
    return await fetch(`${url}?${param}`).then( response => response.json() );
}

function WorkTable( { page, pageCount, pageSize }: IWorkTable ){
    const [list, setList] = useState<IWorks[]|undefined>();
    const { setPageCount } = useContext( PagerContext );
    useEffect(()=>{
        fetch( correctUrl('/rest/works/total'))
            .then(response=>response.text())
            .then(async result=>{
                const actualPageCount = Math.ceil( +result / pageSize );
                if (pageCount !== actualPageCount){
                    setPageCount( actualPageCount );
                    console.log('set list setPAge count', result, actualPageCount);
                }else{
                    const actualList = await getListWithFilters({ pageSize, page });
                    setList( actualList );
                    console.log('set list', actualList);
                }
            })
            .catch(error=>console.error('Fetching error'));
    }, [page, pageSize, pageCount]);
    return <Card border="success">
        <Card.Body>
            <Table className="work__list">
                <thead className="first__td-32">
                    <tr><th>#</th><th>Исполнитель</th><th>Работа</th><th>Дата выполн.</th></tr>
                </thead>
                <tbody><tr><td colSpan={4} style={{margin:0, padding:0}}>
                    {!list ?<Spinner animation="border" />
                           :<WorkTableList list={list} page={page} pageSize={pageSize}/>
                    }
                </td></tr></tbody>
                <tfoot><tr><td colSpan={4}></td></tr></tfoot>
            </Table>
        </Card.Body>
    </Card>
}

export default WorkTable;