import L from 'leaflet';
import {latLngToCoords, normLatLng} from "../libs/coords";
import storeGeom from '../store/geom-store';

class Area extends L.LayerGroup {

    index = 0;
    markers = new Map();
    polygon = L.polygon([]);

    onAdd(map) {
        this.polygon.addTo(map);
        return this;
    }

    onRemove(map) {
        this.polygon.removeFrom(map);
        return this;
    }

    onAddMarker(e) {
        const icon = L.divIcon({
            className: 'my-div-icon',
            html: this.index++,
            iconSize: [24, 24],
            //iconAnchor: [22, 94],
        });
        const latlng = e.latlng;
        const marker = L.marker(latlng, {icon, draggable: true});
        marker
            .on('contextmenu', this.onRemoveMarker, this)
            .on('drag', this.onDragMarker, this)
            //.bindTooltip(latLngToCoords(latlng)).openTooltip()
            .addTo(this);

        this.markers.set(marker._leaflet_id, marker);
        this.renderPolygon();
    }

    onRemoveMarker(e) {
        this.index = 0;
        const layer = e.target;
        const id = layer._leaflet_id;
        this.removeLayer(layer);
        this.markers.delete(id);
        this.markers.forEach(layer => {
            debugger;
            layer._icon.innerHTML = this.index++;
        });
        this.renderPolygon();
    }

    renderPolygon() {
        const path = Array.from(this.markers.values())
            .map(layer => layer.getLatLng());
        storeGeom.setCoords(path.map(latlng => latLngToCoords(latlng)).join('-'));
        this.polygon.setLatLngs(path);
    }

    onDragMarker(e) {
        // const layer = e.target;
        // const id = layer._leaflet_id;
        this.renderPolygon();
    }
}

export default lmap => {

    const area = new Area().addTo(lmap);
    lmap.on('contextmenu', area.onAddMarker, area);
}