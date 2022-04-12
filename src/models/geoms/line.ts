import {ModelGeom} from './base'
import {computed, makeObservable, observable} from "mobx";

export interface ILine {
    path: string
    width: number
}

export class ModelLine extends ModelGeom {
    path: string = ''
    width: number = 0;

    get title(){
        return 'Полоса';
    }

    get validate() {
        const err = new Map<string, string>();
        const val = this.path
            .toUpperCase()
            .replace(/\s|\n|\r/g, '')
            .split('-');
        const isValid = val.every(coords => /^\d{4,6}[NSСЮ]\d{5,7}[WEЗВ]$/.test(coords))
        if (!isValid)
            err.set('path', 'Неверно введена координата');
        return err;
    }

    constructor(data: ILine) {
        super();
        const {path, width} = data;
        this.path = path;
        this.width = width;

        makeObservable(this, {
            path: observable,
            width: observable,
            validate: computed,
        });
    }

    static create() {
        return new ModelLine({path: '5600С04300В-5600С04320В', width: 1});
    }

    toText() {
        return `ПОЛОСА ШИРИНОЙ ПО ${this.width}КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА ${this.path} ПОВЕРХНОСТЬ-1500М СР.УР.МОРЯ.`
    }

    toJSON() {
        return {
            path: this.path,
            width: this.width
        } as ILine;
    }
}

