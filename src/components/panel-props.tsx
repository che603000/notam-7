import {PropsWithChildren} from "react";
import {Form, Tabs, Tab} from 'react-bootstrap';
import model from '../store/app-store';
import {observer} from 'mobx-react';
// import NotamFields from "./notam-filelds";


const View = (props: PropsWithChildren<any>) => {
    //const {} = props;
/*    const onChange = (e: any) => model.setText(e.target.value);
    const setDescription = (e: any) => model.setDescription(e.target.value);

    return (
        <div className="panel-props">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>NOTAM text</Form.Label>
                    <Form.Control as="textarea"
                                  rows={5}
                                  value={model.text}
                                  onChange={onChange}
                    />
                </Form.Group>
            </Form>
            <Tabs defaultActiveKey="F" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="F" title="Description">
                    <Form.Control as="textarea"
                                  rows={5}
                                  value={model.description}
                                  onChange={setDescription}
                                  style={{textTransform: 'uppercase'}}
                    />
                </Tab>
                <Tab eventKey="Q" title="Q">
                    1
                </Tab>
                <Tab eventKey="G" title="GEOM" disabled>
                    2
                </Tab>
            </Tabs>
        </div>
    )*/
    return null;
}

export default observer(View);