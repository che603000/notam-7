import React from 'react';
import PanelProps from './components/panel-creator';
import PanelAlts from './components/panel-alts';
import PanelMap from './components/panel-map';
import {Col, Container, Row} from "react-bootstrap";

function App() {
    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <PanelProps/>
                </Col>
                <Col sm={5}>
                    <PanelMap/>
                </Col>
                <Col sm={3}>
                    {/*<PanelAlts/>*/}
                </Col>
            </Row>


        </Container>
    );
}

export default App;
