import L from 'leaflet';
import {parsePath, positionToCoords} from "../libs/notam/utils/coords-parser";
import {ILine, ModelLine} from "../models/geoms/line";
import {ICircle, ModelCircle} from "../models/geoms/circle";
import {LExt} from "../utils/leaflet-ext";

//import util from 'leaflet-geometryutil';

class LineEdit extends L.Polyline {
    constructor(public path: L.LatLngExpression[], options: any) {
        super(path.filter(p => !!p), options);
    }

    setMoveLatLng(latlng: L.LatLngExpression): this {
        this.path[1] = latlng;
        return super.setLatLngs(this.path.filter(p => !!p));
    }
}

export class Line extends L.LayerGroup {
    lineEdit?: LineEdit;
    latlngStart?: L.LatLng;

    line: L.Polyline;
    markers: L.Marker[];

    lineOptions = {
        color: '#996',
        // weight: 2,
        opacity: 1,
    }
    lineEditOptions = {
        dashArray: '5 5'
    }

    constructor(private path: L.LatLngExpression[], private options: any) {
        super([]);
        this.line = L.polyline(path, {...this.lineOptions, ...options});
        this.markers = path.map((latlng, index) => this.createMarker(latlng, index));
    }

    onAdd(map: L.Map) {
        this.line.addTo(this);
        this.markers.forEach(marker => marker.addTo(this));
        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map) {
        this.line.off().removeFrom(map);
        this.markers.forEach(m => this.removeLayer(m.off()));
        this.markers = [];
        super.onRemove(map);
        return this;
    }

    onDragStart(e: any) {

        const marker: L.Marker = e.target;
        this.latlngStart = marker.getLatLng();
        // @ts-ignore
        const index = marker.options.index;
        const path = [
            this.path[index - 1],
            this.path[index],
            this.path[index + 1]
        ];
        this.lineEdit = new LineEdit(path, {...this.lineOptions, ...this.lineEditOptions}).addTo(this);
    }

    onDrag(e: any) {
        if (!this.lineEdit)
            return;
        this.lineEdit.setMoveLatLng(e.latlng);
    }

    onDragEnd(e: any) {
        this.lineEdit && this.removeLayer(this.lineEdit.off());
        this.lineEdit = undefined;
        const marker: L.Marker = e.target;
        this.latlngStart && marker.setLatLng(this.latlngStart);
    }

    onUpdate() {

    }

    setLatLngs(path: L.LatLngExpression[]) {

    }

    createMarker(latlng: L.LatLngExpression, index: number) {
        const marker = L.marker(latlng, {
            draggable: true,
            icon: L.divIcon({className: 'my-div-icon app-move-icon'}),
            // @ts-ignore
            index
        });
        marker
            .on('dragstart', this.onDragStart, this)
            .on('drag', this.onDrag, this)
            .on('dragend', this.onDragEnd, this);

        return marker;
    }
}


export class StripMap extends L.LayerGroup {
    line: Line;
    strip: L.Polyline;

    lineOptions = {
        color: '#996',
        // weight: 2,
        opacity: 1,
    }
    lineBoundsOptions = {
        color: '#996',
        weight: 20,
        opacity: 0.3,
    }

    constructor(path: LExt.LatLng[], private width: number, private options: any) {
        super([]);
        this.line = new Line(path, {});
        this.strip = L.polyline(path, {...this.lineBoundsOptions, ...options});
    }

    onAdd(map: L.Map) {
        this.line.addTo(this);
        this.strip.addTo(this);
        map.on('zoomend', () => {
            const metresPerPixel = 40075016.686 * Math.abs(Math.cos(this._map.getCenter().lat * Math.PI / 180)) / Math.pow(2, this._map.getZoom() + 8);
            const weight = Math.round(this.width / metresPerPixel);
            this.strip.setStyle({weight});
        })
        super.onAdd(map);

        return this;
    }

    setEdit(isEdit: boolean = false) {

    }

    setItem({path, width}: ILine) {
        const latlngs = this.coordsToPath(path);
        this.strip.setLatLngs(latlngs);
        this.line.setLatLngs(latlngs);
    }

    getBounds() {
        return this.strip.getBounds();
    }

    coordsToPath(coords: string) {
        return parsePath(coords)
            .map(([lng, lat]) => L.latLng([lat, lng]));

    }

    static create(model: ModelLine) {
        const {path, width} = model;
        const latlngs = path.split('-').map(coords => LExt.LatLng.parseCoords(coords));
        return new StripMap(latlngs, width * 1000, {
            model
        });
    }


}

//export const stripMap = (coords: string, center: number, options: any) => new StripMap(coords, center, options);