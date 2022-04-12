import {Row, Col, Form} from 'react-bootstrap';
import {ModelCircle} from '../../../models/geoms/circle';
import {CoordsInput} from '../inputs/input-coords';
import {LengthInput} from '../inputs/input-length';
import {Edit, View, TCompGeom} from './toolbar';


export const CircleView = (props: TCompGeom<ModelCircle>) => {
    const {center, radius} = props.item;

    return (
        <View {...props}>
            <div className="app-panel-content">
                ЦЕНТР: <span className="app-strong-text">{center}</span> РАДИУС: <span
                className="app-strong-text">{radius}КМ</span>
            </div>
        </View>
    )
}

export const CircleEdit = (props: TCompGeom<ModelCircle>) => {
    return (
        <Edit {...props}>
            <CircleForm {...props}/>
        </Edit>
    )
}

const CircleForm = (props: { item: ModelCircle }) => {
    const {item} = props;
    //const [data] = useState(() => item.toJSON());

    return (
        <div className="app-panel-content">
            <Form id={item.cid}>
                <Row>
                    <Col sm={4}>
                        <CoordsInput value={item.center}
                                     error={item.validate.get('center')}
                                     onChange={(val) => item.center = val}
                                     title="Центр окружности"
                                     description="формат 560000С0430000В"/>
                    </Col>
                    <Col sm={3}>
                        <LengthInput value={item.radius}
                                     error={item.validate.get('radius')}
                                     onChange={(val: number) => item.radius = val}
                                     title="Радиус"
                                     description="расстояние в КМ"/>
                    </Col>
                    <Col sm={5}>
                        {/*<AltsInput/>*/}
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export const ComponentCircle = (props: TCompGeom<ModelCircle>) => {

    const {item, onEdit, onRemove, editableId} = props;
    if (item.cid === editableId)
        return <CircleEdit key={item.cid} onEdit={onEdit} onRemove={onRemove} item={item}/>
    else
        return <CircleView key={item.cid} onEdit={onEdit} onRemove={onRemove} item={item} editableId={editableId}/>
}



