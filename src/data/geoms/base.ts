import shortid from 'shortid';

export type TErrorValidate = Map<string, string>;

export interface IGeom {
    cid: string
    type: string

    validate: TErrorValidate

    toText(): string

    toJSON(): any
}

export class ModelGeom implements IGeom {
    cid: string = ''


    get title() {
        return 'base'
    }

    get type() {
        return this.constructor.name;
    }

    get validate() {
        return new Map<string, string>();
    }


    constructor() {
        this.cid = shortid.generate();
    }


    clone(data?: any) {
        return data;
    }

    toText() {
        return `Абстрактный класс`
    }

    toJSON(): any {
        return {}
    }
}

