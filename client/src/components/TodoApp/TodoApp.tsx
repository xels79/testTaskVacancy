import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import WorkTypesPanel from "../WorkTypesPanel/WorkTypesPanel";
import WorkPanel from "../WorkPanel/WorkPanel";
function TodoApp(){
    const [key, setKey] = useState('workTypes');
    return (    <Tabs
      id="controlled-tab-TodoApp"
      activeKey={key}
      onSelect={(k) => setKey(k?k:'workTypes')}
      className="mb-2"
      variant="pills"
    >
      
      <Tab eventKey="workTypes" title="Виды работ">
        {key==='workTypes' && <WorkTypesPanel />}
      </Tab>
      <Tab eventKey="ToDoList" title="Список работ">
        {key==='ToDoList' && <WorkPanel />}
      </Tab>
    </Tabs>
    );
}

export default TodoApp;