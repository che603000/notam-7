import './index.css';
import {observer} from 'mobx-react';
import {Form, Row, Col} from 'react-bootstrap';

import notam from '../../store/model-notam';
import {IGeom} from "../../models/geoms/base";

import {Geometries} from "../../models/geoms";

import * as DI from '../../container-di'
import {TMetaGeometry} from "../../container-di/config";
import {AddItem} from './add-item';


type TProps = {
    geometries: Geometries
    editableId: string
    setEdit(cid?: string): void
}

export const GeomItems = (props: TProps) => {
    const {geometries, editableId, setEdit} = props;
    const {items, removeItem} = geometries;
    return (
        <div>
            {items.map((item: IGeom) => {
                const {component: Component} = DI.getMetaData<TMetaGeometry>(item.type);
                return <Component key={item.cid}
                                  onRemove={removeItem}
                                  onEdit={setEdit} item={item}
                                  editableId={editableId}
                />
            })}
        </div>
    )
}

export const PanelNotam = observer(() => {
    const {geometries, editableId, setEdit} = notam;
    return (
        <div className="app-panel-notam">
            <Form.Control as="textarea" readOnly className="app-text-notam" value={notam.text} rows={5}/>
            <Row>
                <Col>
                    <AddItem/>
                </Col>
            </Row>
            <GeomItems geometries={geometries} editableId={editableId} setEdit={setEdit}/>
        </div>
    )
})

