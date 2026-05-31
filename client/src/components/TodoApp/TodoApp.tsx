import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import WorkTypesPanel from "../WorkTypesPanel/WorkTypesPanel";
import WorkPanel from "../WorkPanel/WorkPanel";
import WarningDialog, { IWarningDialog } from "../WarningDialog/WarningDialog";
import { DialogContext } from "../../contexts/DialogContext";
import { v4 as uuidv4 } from "uuid";

function TodoApp(){
    const [key, setKey] = useState('ToDoList');
    const [dialogData, setDialogStatus] = useState<IWarningDialog>({});
    const showDialog = (params: IWarningDialog) => setDialogStatus({...params});
    const hideDialog = () => setDialogStatus({});
    return (<DialogContext.Provider value={{ showDialog, hideDialog }}>
        <Tabs
          id="controlled-tab-TodoApp"
          activeKey={key}
          onSelect={(k) => setKey(k?k:'ToDoList')}
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
        {dialogData.message && (dialogData.doActionCancel || dialogData.doActionConfirm) 
        && <WarningDialog {...dialogData}/>}
       </DialogContext.Provider>);
}

export default TodoApp;