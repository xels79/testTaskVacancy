import { Modal, Button } from "react-bootstrap";

export interface IWarningDialog{
    doActionCancel?: (()=>void) | false,
    doActionConfirm?: (()=>void) | false,
    title?:string,
    message?:string,
    cacelText?: string,
    confirmText?: string
}

function WarningDialog({
  message,
  title = "Внимание",
  doActionCancel, 
  doActionConfirm,
  cacelText = 'Отменить',
  confirmText = 'Продолжить'
}:IWarningDialog){
    return <Modal show onHide={doActionCancel!==false?doActionCancel:()=>console.log("cancel press")}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          { doActionCancel!==false &&<Button variant="secondary" onClick={doActionCancel}>{cacelText}</Button>}
          { doActionConfirm!==false &&<Button variant="danger" onClick={doActionConfirm}>{confirmText}</Button>}
        </Modal.Footer>
      </Modal>
}

export default WarningDialog;