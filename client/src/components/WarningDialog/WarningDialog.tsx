import { Modal, Button } from "react-bootstrap";

interface IWarningDialog{
    doActionCancel: ()=>void,
    doActionConfirm: ()=>void
    title:string,
    message:string
}

function WarningDialog({message, title, doActionCancel, doActionConfirm}:IWarningDialog){
    return <Modal show onHide={doActionCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doActionCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={doActionConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
}

export default WarningDialog;