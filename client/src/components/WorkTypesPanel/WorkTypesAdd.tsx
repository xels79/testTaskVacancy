import { useRef, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import IWorkTypes from "../../interfaces/IWorkTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import correctUrl from "../../helplers/correctUrl";

interface IWorkTypeAdd{
    doClose:()=>void
}
function WorkTypesAdd({ doClose }:IWorkTypeAdd){
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const butSubmitClick = ()=>formRef?.current?(formRef.current.requestSubmit?formRef.current.requestSubmit():formRef.current.submit()):false;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IWorkTypes>({ values:{ workName: '', description: '' } });
  const onSubmit: SubmitHandler<IWorkTypes> = (data) => {
    const url = correctUrl('/rest/work-types');
    setPending(true);
    fetch(url,{
        method:"post",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
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
  return (
<Modal show={true} onHide={doClose} size="lg" centered>
    <Modal.Header closeButton>
        <Modal.Title>Добавить вид работ</Modal.Title>
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
            <span>Добавить</span>
        </Button>
    </Modal.Footer>
</Modal>
  );
}

export default WorkTypesAdd;