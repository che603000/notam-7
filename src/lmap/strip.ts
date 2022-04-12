import L from 'leaflet';
import {ILine, ModelLine} from "../models/geoms/line";
import {LExt} from "../utils/leaflet-ext";
import {autorun, IReactionDisposer} from "mobx";

export class Line extends L.LayerGroup {
    isUpdateMarker = true;
    disposer?: IReactionDisposer;
    markers: L.Marker[] = [];

    get model() {
        return this.options.model;
    }

    get cid() {
        return this.model.cid;
    }

    constructor(private path: LExt.LatLng[], private options: any) {
        super([]);
    }

    onAdd(map: L.Map) {
        this.disposer = autorun((r) => this.onUpdate(this.model));
        map.on('contextmenu', this.onPathAdd, this);
        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map) {
        this.disposer && this.disposer();
        map.off('contextmenu', this.onPathAdd, this);

        this.clearMarkers()
        super.onRemove(map);
        return this;
    }

    onPathAdd(e: L.LeafletMouseEvent) {
        const {latlng} = e;
        this.model.path = [...this.path, LExt.latLng(latlng)]
            .map(latlng => latlng.toCoords()).join('-');
    }

    onPathRemove(e: L.LeafletMouseEvent) {
        const marker = e.target;
        if (marker.options.type !== 'vertex')
            return;

        this.model.path = this.path
            .filter((latlng, index) => index !== marker.options.index)
            .map(latlng => latlng.toCoords()).join('-');
    }

    onDragStart(e: any) {
        this.isUpdateMarker = false;
        const marker: L.Marker = e.target;
        // @ts-ignore
        marker.options.type = 'vertex';
        // @ts-ignore
        this.markers.filter(marker => marker.options.type !== 'vertex').forEach(marker => marker.setOpacity(0))
    }

    onDrag() {
        this.model.path = this.markers
            // @ts-ignore
            .filter(marker => marker.options.type === 'vertex')
            .map(marker => LExt.latLng(marker.getLatLng()).toCoords()).join('-');
    }

    onDragEnd() {
        this.clearMarkers();
        this.createMarkers();
        this.isUpdateMarker = true;
    }

    onUpdate({path}: ILine) {
        this.path = path.split('-').map(coords => LExt.LatLng.parseCoords(coords));
        if (!this.isUpdateMarker)
            return;
        this.clearMarkers();
        this.createMarkers();
    }

    createMarker(latlng: L.LatLngExpression, options: any) {
        const marker = L.marker(latlng, {
            draggable: true,
            icon: L.divIcon({className: `my-div-icon app-${options.type}-icon`}),
            ...options
        });
        marker
            .on('dragstart', this.onDragStart, this)
            .on('drag', this.onDrag, this)
            .on('dragend', this.onDragEnd, this)
            .on('contextmenu', this.onPathRemove, this);

        return marker;
    }

    clearMarkers() {
        this.markers.forEach(marker => this.removeLayer(marker.off()));
        this.markers = [];
    }

    createMarkers() {
        this.markers = this.path.map((latlng, index, path) => {
            const res = [this.createMarker(latlng, {index, type: 'vertex'}).addTo(this)];
            const nextLatLng = path[index + 1];
            if (nextLatLng) {
                const middleLatLng = nextLatLng && latlng.middleTo(nextLatLng);
                res.push(this.createMarker(middleLatLng, {index, type: 'middle'}).addTo(this));
            }
            return res;
        }).flat();
    }

}


export class StripMap extends L.LayerGroup {
    editLayer: L.LayerGroup | null = null;
    strip: L.Polyline;
    disposer?: IReactionDisposer;

    viewOptions = {
        color: '#996',
        dashArray: '',
        opacity: 0.5
    }
    editOptions = {
        color: '#996',
        opacity: 0.3
    }

    get model() {
        return this.options.model;
    }

    get cid() {
        return this.model.cid;
    }

    get path() {
        return this._path;
    }

    set path(value: LExt.LatLng[]) {
        this._path = value;
        this.strip.setLatLngs(this._path);
    }

    get width() {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        const metresPerPixel = 40075016.686 * Math.abs(Math.cos(this._map.getCenter().lat * Math.PI / 180)) / Math.pow(2, this._map.getZoom() + 8);
        const weight = Math.round(this._width / metresPerPixel);
        this.strip.setStyle({weight});

    }

    constructor(private _path: LExt.LatLng[], private _width: number, private options: any) {
        super([]);
        this.strip = L.polyline(_path, {...this.viewOptions, ...options});
    }

    onAdd(map: L.Map) {
        this.strip
            .on('click', () => this.fire('edit', {cid: this.cid}))
            .addTo(this)
        map.on('zoomend', this.onZoom, this);
        this.disposer = autorun((r) => this.setData(this.model));
        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.strip.off();
        map.off('zoomend', this.onZoom, this);
        this.disposer && this.disposer();
        return super.onRemove(map);
    }

    onZoom() {
        this.width = this._width;
    }

    setEdit(isEdit: boolean = false) {
        if (isEdit === !!this.editLayer)
            return;

        if (isEdit) {
            this.editLayer = new Line(this.path, this.options);
            this.addLayer(this.editLayer);
            this.strip.setStyle(this.editOptions);
        } else {
            this.editLayer && this.removeLayer(this.editLayer);
            this.editLayer = null;
            this.strip.setStyle(this.viewOptions);
        }
    }

    setData({path, width}: ILine) {
        this.path = path.split('-').map(coords => LExt.LatLng.parseCoords(coords));
        this.width = width * 1000;
    }

    getBounds() {
        return this.strip.getBounds();
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