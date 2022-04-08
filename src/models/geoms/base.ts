import shortid from 'shortid';

export type TErrorValidate = Map<string, string>;

export interface IGeom {
    cid: string
    type: Function
    title: string

    validate: TErrorValidate

    //create(): IGeom

    toText(): string

    toJSON(): any
}

export class ModelGeom implements IGeom {
    cid: string = ''

    get title() {
        return 'base'
    }

    get type() {
        return this.constructor;
    }

    get validate() {
        return new Map<string, string>();
    }


    constructor() {
        this.cid = shortid.generate();
    }

    public static create() {
        return new ModelGeom();
    }

    toText() {
        return `Абстрактный класс`
    }

    toJSON(): any {
        return {}
    }
}

