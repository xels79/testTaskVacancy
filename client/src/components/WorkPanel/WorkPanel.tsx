import { useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import WorkAddForm from "./WorkAddForm";
import WorkFilters from "./WorkFilters";
import WorkTable from "./WorkTable";

function WorkPanel(){
    const [updateFlag, setUpdateFlag] = useState(false);
    return <>
        <Card>
            <Card.Body>
                <Card>
                    <ListGroup variant="flush"><WorkAddForm /></ListGroup>
                    <ListGroup variant="flush"><WorkFilters /></ListGroup>
                    <ListGroup variant="flush"><WorkTable /></ListGroup>
                </Card>
            </Card.Body>
        </Card>
    </>
}

export default WorkPanel;