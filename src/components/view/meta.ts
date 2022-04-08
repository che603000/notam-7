export default {}
//import {TCompGeom} from "./items/factory";
// import {ICircle, ModelCircle} from "../../models/geoms/circle";
// import {ModelLine} from "../../models/geoms/line";
// import circle from "./items/circle";
// import line from "./items/line";
//
// import * as DI from '../../utils/di'
//
//
// //export type TCompsGeom = [(props: any) => JSX.Element, (props: any) => JSX.Element]
//
// export interface IMetaModel {
//     title: string
//     name: string
//
//     model: any
//
//     createModel: () => any
//     component: (props: any) => JSX.Element
// }
//
// const meta = new Map([
//     // [ModelLine.name, {
//     //     title: "Полоса",
//     //     name: ModelLine.name,
//     //     model: ModelLine,
//     //     createModel: () => new ModelLine({path: '', width: 1}),
//     //     component: line
//     // } as IMetaModel],
//     [ModelCircle.name, {
//         title: "Окружность",
//         name: ModelCircle.name,
//         model: ModelCircle,
//         createModel: () => new ModelCircle({center: '', radius: 1} as ICircle),
//         component: circle
//     } as IMetaModel]
// ])
//
// export const getMetaModel = (name: string | any) => {
//     const key = typeof name === "string" ? name : name.name;
//     const res = meta.get(key);
//     if (!res)
//         throw new Error(`Не найдены мета даные для model = ${key}`);
//     return res;
// }
//
// export const getMetaKeys = () => Array.from(meta.keys());





