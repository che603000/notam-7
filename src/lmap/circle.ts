import L from 'leaflet';
import util from 'leaflet-geometryutil';
import {ICircle} from "../models/geoms/circle";
import {LExt} from "../utils/leaflet-ext";
import {ModelCircle} from '../models/geoms/circle'
import {autorun, IReactionDisposer} from "mobx";


export class CircleEdit extends L.LayerGroup {
    disposer?: IReactionDisposer;
    centerMarker: L.Marker = L.marker([0, 0], {
        draggable: true,
        icon: L.divIcon({className: 'my-div-icon app-move-icon'})
    });
    radiusMarker: L.Marker = L.marker([0, 0], {
        draggable: true,
        icon: L.divIcon({className: 'my-div-icon app-size-icon'})
    });
    angle: number = 0

    get cid() {
        return this.model.cid;
    }

    get model() {
        return this.options.model;
    }

    get center() {
        return this._center;
    }

    set center(latlng: LExt.LatLng) {
        this._center = latlng;
        this.centerMarker.setLatLng(this._center);
        const radiusLatLng = this.center.destinationTo(this.angle, this.radius);
        this.radiusMarker.setLatLng(radiusLatLng);
    }

    get radius() {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
        const radiusLatLng = this.center.destinationTo(this.angle, this.radius);
        this.radiusMarker.setLatLng(radiusLatLng);
    }

    constructor(private _center: LExt.LatLng, private _radius: number, private options: any) {
        super([]);
    }

    onAdd(map: L.Map) {
        this.centerMarker
            .on('drag', this.onMove, this)
            .on('dragend', this.onMoveEnd, this)
            .addTo(this)

        this.radiusMarker
            .on('drag', this.onRadius, this)
            .on('dragend', this.onRadiusEnd, this)
            .addTo(this)

        this.disposer = autorun((r) => this.setData(this.model));
        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.disposer && this.disposer();

        this.centerMarker.off();
        this.radiusMarker.off();

        return super.onRemove(map);
    }

    onMove(e: any) {
        this.center = LExt.latLng(e.latlng);
        this.model.center = this.center.toCoords();
    }

    onMoveEnd(e: any) {
        this.center = LExt.LatLng.parseCoords(this.model.center);
    }

    onRadius(e: any) {
        this.radius = e.latlng.distanceTo(this.center);
        this.angle = util.angle(this._map, this.center, e.latlng);
        this.model.radius = +(this.radius / 1000).toFixed(1);
    }

    onRadiusEnd(e: any) {
        this.radius = this.model.radius * 1000;
    }

    setData({center, radius}: ICircle) {
        this.center = LExt.LatLng.parseCoords(center);
        this.radius = radius * 1000;
    }

}

export class CircleMap extends L.LayerGroup {
    editLayer: L.LayerGroup | null = null;
    circle: L.Circle;
    disposer?: IReactionDisposer;

    viewOptions = {
        color: '#996',
        dashArray: ''
    }
    editOptions = {
        color: '#996',
        dashArray: '5 5'
    }

    get model() {
        return this.options.model;
    }

    get cid() {
        return this.model.cid;
    }

    get center() {
        return this._center;
    }

    set center(latlng: LExt.LatLng) {
        this._center = latlng;
        this.circle.setLatLng(this._center);
    }

    get radius() {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
        this.circle.setRadius(value);
    }

    constructor(private _center: LExt.LatLng, private _radius: number, private options: any) {
        super([]);
        this.circle = L.circle(_center, _radius, {...this.viewOptions, ...options});
    }

    onAdd(map: L.Map) {
        this.circle
            .on('click', () => this.fire('edit', {cid: this.cid}))
            .addTo(this)
        this.disposer = autorun((r) => this.setData(this.model));
        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.circle.off();
        this.disposer && this.disposer();
        return super.onRemove(map);
    }

    setEdit(isEdit: boolean = false) {
        if (isEdit === !!this.editLayer)
            return;

        if (isEdit) {
            this.editLayer = new CircleEdit(this.center, this.radius, this.options);
            this.addLayer(this.editLayer);
            this.circle.setStyle(this.editOptions);
        } else {
            this.editLayer && this.removeLayer(this.editLayer);
            this.editLayer = null;
            this.circle.setStyle(this.viewOptions);
        }
    }

    setData({center, radius}: ICircle) {
        this.center = LExt.LatLng.parseCoords(center);
        this.radius = radius * 1000;
    }

    getBounds() {
        return this.circle.getBounds();
    }

    static create(model: ModelCircle) {
        const {center, radius} = model;
        const latlng = LExt.LatLng.parseCoords(center);
        return new CircleMap(latlng, radius * 1000, {
            model
        });
    }
}

export const circleMap = (model: ModelCircle) => {
    const {center, radius} = model;
    const latlng = LExt.LatLng.parseCoords(center);
    return new CircleMap(latlng, radius, {
        model
    });
}
