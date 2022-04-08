import {DropdownButton, Dropdown, Button} from 'react-bootstrap';
import notam from '../../store/model-notam';
//import {getMetaKeys, getMetaModel, TMetaCompGeom} from "./meta";
import * as DI from '../../container-di';
import {TMetaCompGeom} from "./items/types";

export const AddItem = () => {
    const {geometries: {addItem}, setEdit} = notam;
    const metaKeys = DI.getKeysGroup('TMetaCompGeom');
    const onAdd = (index: string | null) => {
        if(!index)
            return;
        const Model = metaKeys[parseInt(index)];
        const model = Model.create();
        addItem(model);
        setEdit(model.cid);
    }
    const dropDowns = metaKeys
        .map(key => DI.getMetaData<TMetaCompGeom>(key))
        .map((meta, index) => {
            const {title} = meta;
            return <Dropdown.Item key={title} eventKey={`${index}`}>{title}</Dropdown.Item>
        })
    return (
        <div style={{float: 'right', marginBottom: '1rem'}}>
            <DropdownButton
                title="Создать"
                variant="outline-secondary"
                id="id-types-geom"
                style={{display: 'inline-block'}}
                onSelect={onAdd}
            >
                {dropDowns}
            </DropdownButton>
            <span> </span>
            <Button variant="outline-primary">Сохранить</Button>
        </div>
    )
}

