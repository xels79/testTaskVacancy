import { Card, Col, Container, Row } from "react-bootstrap";
import TodoApp from "./components/TodoApp/TodoApp";

export default function App() {
  return (
    <Container fluid="md">
      <Row className="justify-content-md-center align-items-center">
        <Col md="auto">
          <Card style={{ width: '36rem' }} className="shadow p-3 mb-5 bg-body-tertiary rounded">
            <Card.Body>
              <TodoApp />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}