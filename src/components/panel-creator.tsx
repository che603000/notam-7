import {Form, Tabs, Tab, Alert, Row, Col} from 'react-bootstrap';
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
                    <Alert variant="light" dismissible>
                        <Form.Group className="mb-3" controlId="geom-type">
                            <Form.Label>Тип геометрии</Form.Label>
                            <Form.Select size="sm">
                                <option value="area">Полигон</option>
                                <option value="circle">Круг</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="geom-coords">
                            <Form.Label>Координаты</Form.Label>
                            <Form.Control as="textarea"
                                          readOnly
                                          size="sm"
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
                </Tab>
                <Tab eventKey="Q" title="Q">

                </Tab>
                <Tab eventKey="G" title="GEOM" disabled>
                    2
                </Tab>
            </Tabs>
        </div>
    )
}

export default observer(View);