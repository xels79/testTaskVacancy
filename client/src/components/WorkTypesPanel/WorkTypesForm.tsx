import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import IWorkTypes from "../../interfaces/IWorkTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import correctUrl from "../../helplers/correctUrl";

interface IWorkTypeAdd{
    doClose:()=>void,
    index: number
}
function WorkTypesAdd({ doClose, index }:IWorkTypeAdd){
  const [toEdit, setToEdit] = useState<IWorkTypes|null>(null);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const butSubmitClick = ()=>formRef?.current?(formRef.current.requestSubmit?formRef.current.requestSubmit():formRef.current.submit()):false;
  const {
    register,
    handleSubmit,
    setError,
    setValues,
    formState: { errors, isValid },
  } = useForm<IWorkTypes>({ values: {workName: '', description: ''} });
  const onSubmit: SubmitHandler<IWorkTypes> = (data) => {
    const url = index?correctUrl(`/rest/work-types/${index}`):correctUrl('/rest/work-types');
    setPending(true);
    fetch(url,{
        method: index?"put":"post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response=>response.json())
        .then(answer=>{
            if (answer.statusCode && answer.statusCode!==201 ){
                if (answer.message){
                    setError("workName",{message:answer.message});
                }else{
                    console.error(answer);
                }
            }else{
                doClose();
            }
        })
        .catch(console.error)
        .finally( () => setPending(false) );
  };
  useEffect(()=>{
    const url = correctUrl(`/rest/work-types/${index}`);
    if (index){
        setPending(true);
        fetch(url, {
            method:"get",
        })
        .then(response=>response.json())
        .then(answer=>{
            if (answer.statusCode && answer.statusCode!==201 ){
                if (answer.message){
                    console.error(answer.message);
                }else{
                    console.error(answer);
                }
            }else{
                setValues( answer, { shouldValidate:true } );
                setToEdit( answer );
            }
        })
        .catch(err=>{
            doClose();
            console.error(err);
        })
        .finally(()=>setPending(false));
    }
  }, [index])
  return (
<Modal show={true} onHide={doClose} size="lg" centered>
    <Modal.Header closeButton>
        <Modal.Title>{index?`Изменить вид работы`:"Добавить вид работы"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={ pending }>
                <Form.Group className="mb-3" controlId="formWorkTypeNameID">
                    <Form.Label>Название работы</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите название"
                        {...register("workName", {required:"Должно быть заполнено.",})}
                        isInvalid={!!errors.workName}
                    />
                    {errors.workName && <Form.Control.Feedback type="invalid">
                                            {errors.workName.message}
                                        </Form.Control.Feedback>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formWorkTypeDescriptionID">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" rows={3} {...register("description")}/>
                </Form.Group>
            </fieldset>
            {toEdit && <fieldset>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Добавлен:</Form.Label>
                    <Col sm="4">
                        <Form.Control
                            plaintext
                            readOnly
                            defaultValue={new Date(toEdit.createdAt?toEdit.createdAt:"").toLocaleString()}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Изменён:</Form.Label>
                    <Col sm="4">
                        <Form.Control
                            plaintext
                            readOnly
                            defaultValue={new Date(toEdit.updatedAt?toEdit.updatedAt:"").toLocaleString()}
                        />
                    </Col>
                </Form.Group>
            </fieldset>}
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={doClose}>Отменить</Button>
        <Button variant="primary" onClick={butSubmitClick} disabled={!isValid} className="has__spiner">
            {pending && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />}
            <span>{index?"Сохранить":"Добавить"}</span>
        </Button>
    </Modal.Footer>
</Modal>
  );
}

export default WorkTypesAdd;