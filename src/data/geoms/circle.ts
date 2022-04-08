import {ModelGeom} from './base'
import {computed, makeObservable, observable} from "mobx";

export interface ICircle {
    center: string
    radius: number
}

export class ModelCircle extends ModelGeom {
    center: string = ''
    radius: number = 0;

    constructor(data: ICircle) {
        super();
        const {center, radius} = data;
        this.center = center;
        this.radius = radius;
        makeObservable(this, {
            center: observable,
            radius: observable,
            validate: computed,
        });
    }

    get validate() {
        const center = (this.center).toUpperCase().trim();
        const err = new Map<string, string>();
        if (!/^\d{4,6}[NSСЮ]\d{5,7}[WEЗВ]$/.test(center))
            err.set('center', 'Неверно введена координата');
        if (!(0 < this.radius && this.radius < 999))
            err.set('radius', 'Неверный радиус');
        return err;
    }

    clone(data: ICircle) {
//        debugger;
        const {center, radius} = data;
        this.center = center;
        this.radius=  radius;
        // const model = new ModelCircle(data || this.toJSON());
        // model.cid = this.cid;
        // return model;
    }

    toText() {
        return `ОКРУЖНОСТЬ РАДИУС ${this.radius}КМ ЦЕНТР ${this.center} ПОВЕРХНОСТЬ-1500М СР.УР.МОРЯ.`
    }

    toJSON() {
        const {center, radius} = this;
        return {center, radius} as ICircle;
    }
}

