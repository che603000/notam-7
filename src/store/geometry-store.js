import {makeObservable, observable, computed, action, autorun} from 'mobx';
import L from 'leaflet';
import num from "numeral";
import * as turf from '@turf/turf'
import {Altitude, TAltUnit} from "./units";

const parseLat = (str) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error('parse Lat error');
    const [, d, m, s, attr] = match;

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

const parseLng = (str) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error('parse Lng error');
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export class AppLatLng extends L.LatLng {
    constructor(lat, lng) {
        super(+lat.toFixed(4), +lng.toFixed(4));
    }

    toSTR() {
        const {lat, lng} = this;

        const mLat = lat % 1 * 60;
        const sLat = mLat % 1 * 60;

        const mLng = lng % 1 * 60;
        const sLng = mLng % 1 * 60;

        return [lat, mLat, sLat]
                .map(value => num(value | 0).format('00'))
                .join('') + (lat > 0 ? 'N' : 'S') +
            [lng, mLng, sLng]
                .map((value, index) => num(value | 0).format(index === 0 ? '000' : '00'))
                .join('') + (lat > 0 ? 'E' : 'W');
    }

    static parse(str) {
        if (!str)
            throw Error('str coords invalid')
        const match = str.match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
        if (!match) throw Error('parse str coords invalid');
        const [, lat, lng] = match;
        return new AppLatLng(parseLat(lat), parseLng(lng));
    }
}

export class Geometry {

    path = []; // [AppLatLng]
    minAlt = new Altitude(0, "MET");
    maxAlt = new Altitude(1000, "MET");

    get coords() {
        return this.path.map(latlng => latlng.toSTR()).join('-');
    }

    get length() {
        return this.path.length;
    }

    get valid() {
        return !this.isSelfIntersections();
    }

    constructor() {
        makeObservable(this, {
            path: observable.ref,
            minAlt: observable.ref,
            maxAlt: observable.ref,

            coords: computed,
            valid: computed,

            setAlt: action.bound,
            addLatLng: action,
            removeLatLng: action,
            updateLatLng: action,
            setLatLng: action,
            setCoords: action
        });
    }

    addLatLng(value) {
        const {lat, lng} = value
        this.path = [...this.path, new AppLatLng(lat, lng)];
    }

    removeLatLng(index) {
        this.path = this.path.filter((l, i) => i !== index);
    }

    updateLatLng(value, index) {
        const {lat, lng} = value
        this.path = this.path.map((l, i) => i === index ? new AppLatLng(lat, lng) : l);
    }

    setLatLng(values = []) {
        this.path = values.map(({lat, lng}) => new AppLatLng(lat, lng));
    }

    setCoords(str) {
        if (str) {
            const path = str
                .split('-')
                .map(c => AppLatLng.parse(c));
            const start = path[0]
            const end = path[path.length - 1];
            debugger;
            if (start.equals(end) && path.length > 1)
                path.pop();
            this.path = path;
        } else
            this.path = [];
    }

    toPolygon() {
        const {lat, lng} = this.path[0]
        return turf.polygon([
            [
                ...this.path.map(({lat, lng}) => [lng, lat]),
                [lng, lat]
            ]
        ]);
    }

    toPoints() {
        const {lat, lng} = this.path[0]
        return [
            ...this.path.map(({lat, lng}) => turf.point([lng, lat])),
            turf.point([lng, lat])
        ];
    }

    isSelfIntersections() {
        if (this.length < 4)
            return false;
        const res = turf.kinks(this.toPolygon());
        return res.features.length > 0;
    }

    createConvexPath() {
        if (!this.isSelfIntersections())
            return;

        const points = turf.featureCollection(this.toPoints());
        const hull = turf.convex(points);
        // const options = {units: 'miles', maxEdge: 100};
        // const hull = turf.concave(points, options);
        // console.log(hull);
        if (!hull)
            return;

        const values = turf.getCoords(hull)[0].map(([lng, lat]) => ({lat, lng}));
        values.pop();
        values && this.setLatLng(values);
    }

    setAlt(id, value, unit) {
        this[id] =  new Altitude(value, unit);
    }

}

export default new Geometry();