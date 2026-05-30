import { Button, Card, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import IWorks from "../../interfaces/IWorks";

import { 
    PlusCircleFill,
    BoundingBoxCircles,
    Beaker,
    Calendar,
    JournalBookmark,
    Briefcase
} from 'react-bootstrap-icons';
import { useEffect, useState } from "react";
import IWorkTypes from "../../interfaces/IWorkTypes";
import ISelecOptions from "../../interfaces/ISelecOptions";
import correctUrl from "../../helplers/correctUrl";
const initialValue:IWorks = {
        state: 0,
        workTypesID: 0,
        fio: "",
        dateOfCompletion: new Date().toISOString().split('T')[0],
        volume: 1,
        uoMeasurement: "п.м."
}
function WorkAddForm(){
    const [pending, setPending] = useState(false);
    const [ worksList, setWorkList ] = useState<ISelecOptions[]|null>(null);
    const formMethods = useForm<IWorks>({ values: initialValue });
    const {
        register,
        handleSubmit,
        setValues,
        formState: { errors, isValid },
    } = formMethods;
    const onSubmit: SubmitHandler<IWorks> = (data) => {
        const toSend = { ...data, ...{ dateOfCompletion: new Date( data.dateOfCompletion ).getTime() }}
        const url = correctUrl('/rest/works');
        setPending(true);
        fetch( url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( toSend )
        } )
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setValues(initialValue, {shouldDirty:true});
        })
        .finally(()=>setPending(false))
        console.log(toSend);

    }
    useEffect(()=>{
        const url = correctUrl(`/rest/work-types`);
        fetch(url, {method: 'get'})
            .then(async (response)=>(await response.json()) as IWorkTypes[])
            .then(data=>setWorkList(data.map(it=>({
                label:it.workName,
                value:`${it.id}`}))))
            .catch(err=>console.error(err));
    }, [1]);
    return (<Card  border="info">
        <Card.Header>Добавить</Card.Header>
        <Card.Body>
            <FormProvider {...formMethods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="row align-items-center" disabled={pending}>
                    <Col className="col-6">
                        <InputGroup size="sm">
                            <InputGroup.Text id="work-select"><Briefcase /></InputGroup.Text>
                            {worksList ? <><Form.Select 
                                        id="work-select"
                                        { ...register("workTypesID" ,{
                                            setValueAs: v=>+v,
                                            min:{ value:1, message: "Должно быть заполнено." }
                                        }) }
                                        isInvalid={!!errors.workTypesID}
                                >
                                    <option value={0} selected>Выберите работу</option>
                                    {worksList.map((item, index)=><option
                                        key={`wSel_${index}`}
                                        value={item.value}
                                    >{item.label}</option>)}
                                </Form.Select>
                                {errors.workTypesID && <Form.Control.Feedback type="invalid">
                                                        {errors.workTypesID.message}
                                                    </Form.Control.Feedback>
                                }
                            </>
                            :<Form.Control as='div' className="d-flex justify-content-center">
                                <Spinner size="sm" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner></Form.Control>}
                        </InputGroup>
                    </Col>
                    <Col className="col-6">
                        <InputGroup size="sm">
                            <InputGroup.Text id="workw-name"><JournalBookmark /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                id="workw-name"
                                title="Укажите ФИО исполнителя"
                                placeholder="ФИО"
                                {...register("fio", {
                                    required:"Должно быть заполнено.",
                                })}
                                isInvalid={!!errors.fio}
                            />
                            {errors.fio && <Form.Control.Feedback type="invalid">
                                                    {errors.fio.message}
                                                </Form.Control.Feedback>
                            }

                        </InputGroup>
                    </Col>
                </fieldset>
                <fieldset className="row align-items-center mt-1" disabled={pending}>
                    <Col className="col-4">
                        <InputGroup size="sm">
                            <InputGroup.Text id="work-date"><Calendar /></InputGroup.Text>
                            <Form.Control
                                type="date"
                                id="work-date"
                                title="Укажите дату окончания"
                                placeholder="Укажите дату"
                                {...register("dateOfCompletion", {
                                    required:"Должно быть заполнено.",
                                })}
                                isInvalid={!!errors.dateOfCompletion}
                            />
                            {errors.dateOfCompletion && <Form.Control.Feedback type="invalid">
                                                    {errors.dateOfCompletion.message}
                                                </Form.Control.Feedback>
                            }
                        </InputGroup>
                    </Col>
                <Col className="col-2">
                        <InputGroup size="sm">
                            <InputGroup.Text id="workw-count"><Beaker /></InputGroup.Text>
                            <Form.Control
                                type="number"
                                id="workw-count"
                                title="Укажите оюъём рабрты"
                                placeholder="Количество"
                                {...register("volume", {
                                    required:"Должно быть заполнено.",
                                    setValueAs: v => +v,
                                    min:{value: 1, message: "Не меньне 1"}
                                })}
                                isInvalid={!!errors.volume}
                            />
                            {errors.volume && <Form.Control.Feedback type="invalid">
                                                    {errors.volume.message}
                                                </Form.Control.Feedback>
                            }

                        </InputGroup>
                    </Col>
                    <Col className="col-3">
                        <InputGroup size="sm">
                            <InputGroup.Text id="work-units-select"><BoundingBoxCircles /></InputGroup.Text>
                            <Form.Select
                                id="work-units-select"
                                title="Единицы измерения"
                                {...register("uoMeasurement", {
                                    required:"Должно быть заполнено.",
                                })}
                                isInvalid={!!errors.uoMeasurement}
                            >
                                <option value="п.м.">п.м.</option>
                                <option value="кв.м.">кв.м.</option>
                                <option value="куб.м.">куб.м.</option>
                                <option value="шт.">шт.</option>
                                <option value="час.">час.</option>
                                <option value="литры">литры</option>
                            </Form.Select>
                            {errors.uoMeasurement && <Form.Control.Feedback type="invalid">
                                                    {errors.uoMeasurement.message}
                                                </Form.Control.Feedback>
                            }

                        </InputGroup>
                    </Col>
                    <Col className="col-3 text-end">
                        <Button disabled={ !isValid } variant="success" size="sm" title="Добавить" type="submit"><PlusCircleFill /></Button>
                    </Col>
            </fieldset>
            </Form>
            </FormProvider>
        </Card.Body>
    </Card>)
}

export default WorkAddForm;