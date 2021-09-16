import {PropsWithChildren} from "react";
import {Form, Tabs, Tab, Alert, Row, Col, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap';
import model from '../store/geom-store';
import {observer} from 'mobx-react';



const View = (props: PropsWithChildren<any>) => {
    //const {} = props;
    const onChange = (e: any) => model.setCoords(e.target.value);
    const setDescription = (e: any) => model.setDescription(e.target.value);

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
                                          size="sm"
                                          rows={2}
                                          value={model.coords}
                                          onChange={onChange}
                                          isInvalid={!model.isValid}
                                          placeholder="560000N0430000E-560500N0430500E-..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="geom-alts">
                            <Row>
                                <Col>
                                    <Form.Label>Нижняя граница</Form.Label>
                                    <InputGroup className="mb-3" size="sm">
                                        <Form.Control type="number" max={9999} min={0} step={10}
                                                      aria-label="Text input with dropdown button"/>

                                        <DropdownButton
                                            variant="outline-secondary"
                                            title="МЕТРЫ"
                                            id="input-group-dropdown-2"
                                            align="end"
                                        >
                                            <Dropdown.Item href="#">Action</Dropdown.Item>
                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup> </Col>
                                <Col>
                                    <Form.Label>Верхняя граница</Form.Label>
                                    <Form.Control size="sm"/>
                                </Col>
                            </Row>

                        </Form.Group>
                    </Alert>
                </Tab>
                <Tab eventKey="Q" title="Q">
                    <Form.Control as="textarea"
                                  rows={5}
                                  value={model.description}
                                  onChange={setDescription}
                                  style={{textTransform: 'uppercase'}}
                    />
                </Tab>
                <Tab eventKey="G" title="GEOM" disabled>
                    2
                </Tab>
            </Tabs>
        </div>
    )
}

export default observer(View);