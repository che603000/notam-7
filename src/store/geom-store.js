import {makeObservable, observable, computed, action, autorun} from 'mobx';


class Geom {

    coords = "";
    description = ""

    get isValid() {
        if (!this.coords)
            return true;
        return this.coords.split('-').every(coords => /\d{6}[NECСЮ]\d{7}[EWЕЗВ]/.test(coords))
            || this.coords.split('-').every(coords => /\d{4}[NECСЮ]\d{5}[EWЕЗВ]/.test(coords));
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

class GeomStore {

    textCoords = new Geom()
    mapCoords = new Geom()

    constructor() {
        autorun(() => {
            this.textCoords.setCoords(this.mapCoords.coords);
        });
        autorun(() => {
            if (this.textCoords.isValid)
                this.mapCoords.setCoords(this.textCoords.coords);
        })
    }
}

export default new GeomStore();