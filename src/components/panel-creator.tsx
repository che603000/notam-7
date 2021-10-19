import {Form, Tabs, Tab, Alert, Row, Col, Button, Table} from 'react-bootstrap';
import {
    FaRegTrashAlt as IconRemove,
    FaRegEdit as IconEdit,
    FaRegSave as IconSave,
    FaRegTimesCircle as IconClose,
    FaPlus as IconAdd
} from 'react-icons/fa';
import model from '../store/geometry-store';
import {observer} from 'mobx-react';
import Alts from './altitude';


const View = () => {
    const onChange = (e: any) => {
        model.setCoords(e.target.value);
    }
    const onSelf = () => model.createConvexPath();

    return (
        <div className="panel-props">
            <Tabs defaultActiveKey="F" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="F" title="Area">
                    <Alert variant="light">
                        <div className="geometry-tools-clock">
                            <button className="btn-tools"><IconSave/></button>
                            <button className="btn-tools"><IconClose/></button>
                        </div>
                        <Form.Group className="mb-3" controlId="geom-type">
                            <Form.Label>Тип геометрии</Form.Label>
                            <Form.Select>
                                <option value="area">Полигон</option>
                                <option value="circle">Круг</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="geom-coords">
                            <Form.Label>Координаты</Form.Label>
                            <Form.Control as="textarea"
                                          readOnly
                                          rows={2}
                                          value={model.coords}
                                          onChange={onChange}
                                          isInvalid={!model.valid}
                                          placeholder="560000N0430000E-560500N0430500E-..."
                            />
                            <Form.Control.Feedback type="invalid">
                                {model.isSelfIntersections() &&
                                <span> Самопересечение <a href="#" onClick={onSelf}>исправить</a></span>}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="geom-alts">
                            <Row>
                                <Col>
                                    <Form.Label>Нижняя граница</Form.Label>
                                    <Alts id="minAlt" value={model.minAlt} setValue={model.setAlt}/>
                                </Col>
                                <Col>
                                    <Form.Label>Верхняя граница</Form.Label>
                                    <Alts id="maxAlt" value={model.maxAlt} setValue={model.setAlt}/>
                                </Col>
                            </Row>

                        </Form.Group>
                    </Alert>
                    <Alert variant="success">

                        <div className="geometry-tools-clock">
                            <button className="btn-tools"><IconRemove/></button>
                            <button className="btn-tools"><IconEdit/></button>
                        </div>
                        1. ПОЛОСА ШИРИНА=2KM 560000N0430000E-560000N0430000E-560000N0430000E...
                    </Alert>
                    <Alert variant="warning">
                        <div className="geometry-tools-clock">
                            <button className="btn-tools"><IconRemove/></button>
                            <button className="btn-tools"><IconEdit/></button>
                        </div>
                        2. Круг R=2KM CENTER=560000N0430000E
                    </Alert>
                </Tab>
                <Tab eventKey="Q" title="Q">

                </Tab>
                <Tab eventKey="G" title="GEOM" disabled>

                </Tab>
            </Tabs>
        </div>
    )
}

export default observer(View);