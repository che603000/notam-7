import {makeObservable, observable, computed, action} from 'mobx';


class GeomStore {

    coords = "";
    description = ""

    get isValid() {
        return this.coords.split('-').every(coords => /\d{6}[NE]\d{7}[EW]/.test(coords));
    }

    constructor() {
        makeObservable(this, {
            coords: observable,
            description: observable,
            isValid: computed,

            setCoords: action,
            setDescription: action,
        });
    }

    setCoords(value) {
        this.coords = value;
    }

    setDescription(value) {
        this.description = value;
    }

    validate() {
        const invalidCoords = [];
        return this.coords
            .split('-')
            .forEach((coords, index) => {
                if (!/\d{6}[NE]\d{7}[EW]/.test(coords))
                    invalidCoords.push(coords);
            });
    }
}

export default new GeomStore();