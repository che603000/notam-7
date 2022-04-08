import './index.css';

import {observer} from 'mobx-react';
import {Form, Row, Col} from 'react-bootstrap';

import {IGeom} from "../../models/geoms/base";
import notam from '../../store/model-notam';
import {TMetaCompGeom} from './items/types';
import {AddItem} from './add-item';
import {Geometries} from "../../models/geoms";
import './items/circle';
import * as DI from '../../container-di'

export const GeomItems = (props: { geometries: Geometries, editableId: string, setEdit(cid?: string): void }) => {
    const {geometries, editableId, setEdit} = props;
    const {items, removeItem} = geometries;
    return (
        <div>
            {items.map((item: IGeom) => {
                const {component: Component} = DI.getMetaData<TMetaCompGeom>(item.type);
                //debugger;
                //const Component = getMetaModel(item.type).component;
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

