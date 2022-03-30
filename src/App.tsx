import React, {PropsWithChildren, useState} from 'react';
import {Unit} from "./components/units";
//import PanelNotam from './components/notam/panel-notam';
//import PanelAlts from './components/panel-alts';

import PanelMap from './components/panel-map';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

// const notamText = `(Х6727/21 НОТАМН
// Щ)УУВЖ/ЩРТЦА/ИЖ/БО/В/000/030/5647С04016В017
// А)УУВЖ Б)2109140700 Ц)2109172100
// Д)14-17 0700-2100
// Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА РАЙОН:
// 565600С0403500В-565200С0403500В-564900С0402700В-564300С0404100В-
// 563600С0403800В-563800С0395800В-564600С0395300В-565100С0400400В-
// 565700С0402000В-565600С0403500В
// (МР024579).
// Ф)ПОВЕРХНОСТЬ
// Г)725 М СР.УР.МОРЯ)`;
//
// const d= decode(notamText);
// const n = Notam.parse(d)
// console.log(n);
// debugger;

import {TDataUnit, unitsLength, unitsAlt, FL, KM} from './models/units'

const Panel = (props: PropsWithChildren<any>) => {
    const {type} = props;
    const [value, setValue] = useState("name123")
    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    const onAdd = () => console.log(value);

    const ElementGeom = createGeom("CIRCLE");


    return (
        <div>
            <ElementGeom type={type} onChange={onChange} value={value}/>
            <Button onClick={onAdd}>SUBMIT</Button>
        </div>
    )
}

export const CircleGeom = (props: unknown) => {
    const {value, onChange} = props
    return (
        <Form.Control name="name" value={value} onChange={onChange}/>
    )
}

const createGeom = (comp: string) => {
    switch (comp) {
        case "CIRCLE" :
            return CircleGeom;
        default:
            throw new Error(`not fount link component from alias : ${comp}`)
    }
}


const Elem = React.createElement("CircleGeom");

function App() {
    const [data, setData] = useState<TDataUnit>({
        value: 200,
        unit: KM
    })

    const [alt, setAlt] = useState<TDataUnit>({
        value: 230,
        unit: FL
    })

    const onChange = (d: TDataUnit) => {
        console.log(d);
        setData(d);
    }

    const onAltChange = (d: TDataUnit) => {
        console.log(d);
        setAlt(d);
    }

    const ElementGeom = createGeom("CIRCLE");

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Unit units={unitsLength} value={data} onChange={onChange} min={0} max={1000}/>
                </Col>
                <Col>
                    <Unit units={unitsAlt} value={alt} onChange={onAltChange} min={0} max={9999}/>
                </Col>
                <Col></Col>
                <Panel type={"CIRCLE"}/>
                <Col></Col>
                <Col></Col>
                {/*<Col sm={6}>*/}
                {/*    <PanelNotam/>*/}
                {/*</Col>*/}
                {/*<Col sm={6}>*/}
                {/*    <PanelMap/>*/}
                {/*</Col>*/}
                {/*<Col sm={3}>*/}
                {/*    /!*<PanelAlts/>*!/*/}
                {/*</Col>*/}
            </Row>


        </Container>
    );
}

export default App;
