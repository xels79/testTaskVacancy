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
          <Modal.Title className="text-danger">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doActionCancel}>
            Отменить
          </Button>
          <Button variant="danger" onClick={doActionConfirm}>
            Продолжить
          </Button>
        </Modal.Footer>
      </Modal>
}

export default WarningDialog;