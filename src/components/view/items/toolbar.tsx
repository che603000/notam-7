import {PropsWithChildren} from "react";
import {Button} from 'react-bootstrap';
import {
    FaTrashAlt as IconTrash,
    //FaSave as IconSave,
    FaRegEdit as IconEdit,
    FaWindowClose as IconClose
} from 'react-icons/fa';
import {IGeom, ModelGeom} from "../../../models/geoms/base";
import cn from 'classnames';


export type TCompGeom<T> = {
    item: T
    onRemove(cid: string): void
    onEdit(cid?: string): void
    editableId?: string
}

export const ToolbarView = (props: TCompGeom<IGeom>) => {
    const {item: {cid, type, title}, onEdit, onRemove, editableId} = props;

    return (
        <div className="app-panel-title">
            <strong>{title}</strong>
            <div className="app-panel-title-toolbar">
                <Button variant="light" size="sm" onClick={() => onRemove(cid)}
                        disabled={!!editableId}><IconTrash/></Button>
                <span> </span>
                <Button variant="light" size="sm" onClick={() => onEdit(cid)}
                        disabled={!!editableId}><IconEdit/></Button>
            </div>
        </div>
    )
}

export const ToolbarEdit = (props: TCompGeom<IGeom>) => {
    const {onEdit, item} = props;
    //const meta = getMetaModel(type);
    return (
        <div className="app-panel-title">
            <strong>{item.title}</strong>
            <div className="app-panel-title-toolbar">
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => onEdit('')}
                >
                    <IconClose/>
                </Button>
            </div>
        </div>
    )
}


export const Edit = <T extends ModelGeom, >(props: PropsWithChildren<TCompGeom<T>>) => {
    return (
        <div className="app-panel app-panel-editable">
            <ToolbarEdit {...props}/>
            {props.children}
        </div>
    )
}

export const View = <T extends ModelGeom, >(props: PropsWithChildren<TCompGeom<T>>) => {
    const error = props.item.validate;

    const className = cn({
        "app-panel": true,
        "text-danger": error.size > 0
    })
    return (
        <div className={className}>
            <ToolbarView {...props}/>
            {props.children}
        </div>
    )
}