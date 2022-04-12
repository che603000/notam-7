import {DropdownButton, Dropdown, Button} from 'react-bootstrap';
import notam from '../../store/model-notam';
import * as DI from '../../container-di';
import {GROUP_LIST_GEOMETRY, TMetaGeometry} from "../../container-di/config";

export const AddItem = () => {
    const {geometries: {addItem}, setEdit} = notam;
    const metaKeys = DI.getKeysGroup(GROUP_LIST_GEOMETRY);
    const onAdd = (index: string | null) => {
        if(!index)
            return;
        const Model = metaKeys[parseInt(index)];
        const model = Model.create();
        addItem(model);
        setEdit(model.cid);
    }
    const dropDowns = metaKeys
        .map(key => DI.getMetaData<TMetaGeometry>(key))
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

