import { Button, ButtonGroup, Card, Col, Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFilterBase } from "../../interfaces/IFilters";
import { Calendar } from "react-bootstrap-icons";
import { useContext } from "react";
import { WorkFiltersContext } from "../../contexts/WorkFiltersContext";

interface IWorkFilters{
}

function WorkFilters( {  }:IWorkFilters ){
    const { setFilters } = useContext( WorkFiltersContext );
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<IFilterBase>();
    const onSubmit: SubmitHandler<IFilterBase> = (data) => {
        console.log(data);
        setFilters({
            ...data,
            dateCompleteon:data.dateCompleteon?new Date(data.dateCompleteon).getTime():0
        });
    }
    const onReset = ()=>{
        console.log('onReset', getValues())
        setFilters( getValues() );
    }
    return <Card border="warning" className="mt-2">
        <Card.Header>Фильтры</Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                <fieldset className="row align-items-center">
                    <Col className="col-4">
                        <InputGroup size="sm">
                            <InputGroup.Text id="work-dateCompleteon"><Calendar className="me-1" />Дата окончания работ</InputGroup.Text>
                            <Form.Control
                                type="date"
                                id="work-date"
                                title="Укажите дату окончания"
                                placeholder="Укажите дату"
                                {...register("dateCompleteon", {
                                    required:"Должно быть заполнено.",
                                })}
                                isInvalid={!!errors.dateCompleteon}
                            />
                            {errors.dateCompleteon && <Form.Control.Feedback type="invalid">
                                                    {errors.dateCompleteon.message}
                                                </Form.Control.Feedback>
                            }
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="range-switch"
                            label="Покозать все работы до этой даты"
                            {...register("entriesBefore")}
                        />
                    </Col>
                    <Col className="col-3 text-end">
                        <ButtonGroup>
                            <Button variant="outline-success" size="sm" title="Добавить" type="submit">Применит</Button>
                            <Button variant="secondary" size="sm" title="Добавить" type="reset">Очистить</Button>
                        </ButtonGroup>
                    </Col>
                </fieldset>
            </Form>
        </Card.Body>
    </Card>
}

export default WorkFilters;