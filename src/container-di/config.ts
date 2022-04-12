import L from 'leaflet';
import {ModelCircle} from '../models/geoms/circle';
import {ComponentCircle} from "../components/view/items/circle";
import {ComponentLine} from "../components/view/items/line";
import {CircleMap} from '../lmap/circle';
import {ModelLine} from "../models/geoms/line";
import {StripMap} from '../lmap/strip';

export const GROUP_LIST_GEOMETRY = "LIST_GEOMETRY";

export type TMetaGeometry = {
    title: string
    model: Function
    component: any
    layer: L.Class
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        key: ModelCircle,
        data: {
            title: 'Окружность',
            model: ModelCircle,
            component: ComponentCircle,
            layer: CircleMap
        } as TMetaGeometry,
        group: GROUP_LIST_GEOMETRY
    },
    {
        key: ModelLine,
        data: {
            title: 'Полоса',
            model: ModelLine,
            component: ComponentLine,
            layer: StripMap,
        } as TMetaGeometry,
        group: GROUP_LIST_GEOMETRY
    }
]

