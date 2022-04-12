import React from "react";
import {observer} from "mobx-react";
import {Row, Col, Form} from 'react-bootstrap';
import {ModelLine} from '../../../models/geoms/line';
import {PathInput} from '../inputs/input-path';
import {Edit, View, TCompGeom} from './toolbar';
import {LengthInput} from "../inputs/input-length";


export const LineView = (props: TCompGeom<ModelLine>) => {
    const {path, width} = props.item;
    return (
        <View {...props}>
            <div className="app-panel-content">
                МАРШРУТ: <span className="app-strong-text">{path}</span>
                <br/>
                ШИРИНА: <span className="app-strong-text">{width}КМ</span>
            </div>
        </View>
    )
}

const LineForm = observer((props: { item: ModelLine}) => {
    const {item} = props;


    return (
        <div className="app-panel-content">
            <Form>
                <Row>
                    <Col>
                        <PathInput
                            title="Маршрут"
                            error={item.validate.get('path')}
                            description="полоса от оси маршрута"
                            value={item.path}
                            onChange={(val: string) => item.path = val}/>
                    </Col>
                </Row>
                <p/>
                <Row>
                    <Col sm={3}>
                        <LengthInput
                            value={item.width}
                            onChange={(val: number) => item.width = val}
                            title="Ширина полосы"
                            description="расстояние в КМ"/>
                    </Col>
                    <Col sm={5}>
                        {/*<AltsInput/>*/}
                    </Col>
                </Row>
            </Form>
        </div>
    )
})

export const LineEdit = (props:  TCompGeom<ModelLine>) => {
    return (
        <Edit {...props}>
            <LineForm {...props}/>
        </Edit>
    )
}

export const ComponentLine = (props: TCompGeom<ModelLine>) => {

    const {item, onEdit, onRemove, editableId} = props;
    if (item.cid === editableId)
        return <LineEdit key={item.cid} onEdit={onEdit} onRemove={onRemove} item={item}/>
    else
        return <LineView key={item.cid} onEdit={onEdit} onRemove={onRemove} item={item} editableId={editableId}/>
}