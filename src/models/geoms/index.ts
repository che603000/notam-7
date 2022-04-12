import {IGeom} from "./base";
import {action, makeObservable, observable, observe} from "mobx";
import {ModelCircle} from "./circle";
import {ModelLine} from "./line";

export class Geometries {

    items = observable.array<IGeom>([
        //new ModelCircle({center: '5600С04300В', radius: 2})
        ModelLine.create()
    ], {deep: false})

    constructor() {
        makeObservable(this, {
            addItem: action.bound,
            removeItem: action.bound
        })
    }

    addItem(changeItem: IGeom) {
        this.items.push(changeItem);
    }

    removeItem(cid: string) {
        const item = this.items.find(item => item.cid === cid);
        item && this.items.remove(item);
    }
}