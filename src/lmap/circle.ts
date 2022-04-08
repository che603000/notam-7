import L from 'leaflet';
import util from 'leaflet-geometryutil';
import {ICircle} from "../models/geoms/circle";
import {LExt} from "../utils/leaflet-ext";

export class CircleMap extends L.LayerGroup {
    isEdit = false
    circle: L.Circle;
    centerMarker: L.Marker
    radiusMarker: L.Marker
    angle: number = 0
    circleOptions = {
        color: '#996'
    }

    constructor(private center: LExt.LatLng, private radius: number, private options: any) {
        super([]);
        this.circle = L.circle(center, radius, {...this.circleOptions, ...options});
        this.centerMarker = L.marker(center, {
            draggable: true,
            icon: L.divIcon({className: 'my-div-icon app-move-icon'})
        });
        const radiusLatLng = center.destinationTo(0, radius);
        this.radiusMarker = L.marker(radiusLatLng, {
            draggable: true,
            icon: L.divIcon({className: 'my-div-icon app-size-icon'})
        });
    }

    onAdd(map: L.Map) {
        this.circle
            .on('click', () => this.fire('edit', {cid: this.options.cid}))
            .addTo(this)

        super.onAdd(map);
        return this;
    }

    onRemove(map: L.Map): this {
        this.circle.off();
        this.centerMarker.off();
        this.radiusMarker.off();
        return super.onRemove(map);
    }

    onDragCenter(e: any) {
        this.options.item.center = LExt.latLng(e.latlng);
    }

    onDragRadius(e: any) {
        const distance = e.latlng.distanceTo(this.centerMarker.getLatLng());
        this.options.item.radius = +(distance / 1000).toFixed(1);
        this.angle = util.angle(this._map, this.centerMarker.getLatLng(), e.latlng);
        //this.circle.setRadius(distance);
    }

    onDragEndCenter(e: any) {
        this.options.item.center = LExt.latLng(e.target.getLatLng());
    }

    onDragEndRadius(e: any) {
        const latlng = e.target.getLatLng();
        const distance = latlng.distanceTo(this.centerMarker.getLatLng());
        this.options.item.radius = +(distance / 1000).toFixed(1);

    }

    setEdit(isEdit: boolean = false) {
        if (isEdit === this.isEdit)
            return;

        this.isEdit = isEdit;
        if (isEdit) {
            const centerLatLng = this.circle.getLatLng()
            this.circle.setStyle({dashArray: "5 5"})
            this.centerMarker
                .setLatLng(centerLatLng)
                .on('drag', this.onDragCenter, this)
                .on('dragend', this.onDragEndCenter, this)
                .addTo(this)

            const radiusLatLng = util.destination(centerLatLng, 0, this.circle.getRadius());
            this.radiusMarker
                .setLatLng(radiusLatLng)
                .on('drag', this.onDragRadius, this)
                .on('dragend', this.onDragEndRadius, this)
                .addTo(this)
        } else {
            this.circle.setStyle({dashArray: ""})
            this.centerMarker.off().removeFrom(this._map);
            this.radiusMarker.off().removeFrom(this._map);
        }
    }

    setItem({center, radius}: ICircle) {
        this.circle.setLatLng(LExt.LatLng.parseCoords(center));
        this.circle.setRadius(radius * 1000);

        const centerLatLng = this.circle.getLatLng();
        const radiusLatLng = util.destination(centerLatLng, this.angle, this.circle.getRadius());

        this.centerMarker.setLatLng(centerLatLng);
        this.radiusMarker.setLatLng(radiusLatLng);
    }

    getBounds() {
        return this.circle.getBounds();
    }

    coordsToLatLng(coords: string) {
        // const [lng, lat] = parseCoords(coords);
        // return LExt.latLng(0, 0);
    }
}

export const circleMap = (coords: LExt.LatLng, center: number, options: any) => new CircleMap(coords, center, options);