import { useContext, useEffect, useState } from "react";
import { IPager } from "../../interfaces/IFilters";
import PagerContext from "../../contexts/PagerContext";
import { Pagination } from "react-bootstrap";

function PginationBar( { page, pageCount }:IPager ){
    const { setPage } = useContext( PagerContext );
    const [items, setItems] = useState<React.JSX.Element[]>([]);
    useEffect( ()=>{
        let start: number, end: number;
        let addToStart = false;
        let addToEnd = false;
        if (pageCount<15){
            start = 0;
            end = pageCount - 1;
        } else {   
            if (page>5){
                start = page - 4;
                addToStart = true;
            }else{
                start = 0;
            }
            if (page + 5 < pageCount){
                end = page + 5;
                addToEnd = true;
            }else{
                end = pageCount - 1;
            }
        }
        const result = [ ...Array( end - start + 1 ) ].map( (_, i) => <Pagination.Item 
            key={`link-${page*pageCount + start + i}`}
            onClick={()=>setPage(start + i)}
            active={page === start + i}
            >
                {start + i + 1}
            </Pagination.Item>);
        if (addToStart){
            result.unshift(<Pagination.Ellipsis />);
        }
        if (addToEnd){
            result.push(<Pagination.Ellipsis />);
        }
        setItems( result );
    }, [ pageCount, page ] );
    return <>
        {pageCount && <Pagination >
            <div></div>
            <Pagination.First onClick={ () => setPage(0) }/>
            <Pagination.Prev onClick={ () => setPage( page - 1 ) } disabled={ page - 1 < 0 }/>
            { items }
            <Pagination.Next onClick={ () => setPage( page + 1 )} disabled={ page + 1 >= pageCount } />
            <Pagination.Last onClick={ () => setPage( pageCount - 1 )} disabled={ pageCount < 2 }/>
        </Pagination>}
    </>
}

export default PginationBar;