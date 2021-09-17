import L from 'leaflet';
import model from '../store/geometry-store';
import {autorun} from "mobx";


const ERROR_COLOR = "#F99"
const SUCCESS_COLOR = "#AAF"

class Area extends L.LayerGroup {

    options = {
        fill: true,
        fillColor: SUCCESS_COLOR,
        fillOpacity: 0.1
    }


    onAdd(map) {
        this.dispose = autorun(() => this.onRender(model.path));
        this.disposeValid = autorun(() => this.onValid(model.valid));
        return this;
    }

    onRemove(map) {
        this.dispose();
        return this;
    }

    onRender(path) {
        this.clearLayers();
        path.forEach((latlng, index) => {
            this.createMarker(latlng, index).addTo(this);
            L.polygon(path, this.options).addTo(this);
        });
    }

    onAddMarker(e) {
        const latlng = e.latlng;
        model.addLatLng(latlng);
    }

    onRemoveMarker(e) {
        const marker = e.target;
        model.removeLatLng(marker.options.index);
    }

    onDragMarker(e) {
        const marker = e.target;
        model.updateLatLng(marker.getLatLng(), marker.options.index)
    }

    onValid(value) {
        this.getLayers().map(layer => {
            this.options.fillColor = value ? SUCCESS_COLOR: ERROR_COLOR;
            if (layer instanceof L.Polygon) {
                layer.setStyle(this.options);
            }
        })
    }

    createMarker(latlng, index) {
        const icon = L.divIcon({
            className: 'my-div-icon',
            html: index.toString(),
            iconSize: [24, 24],
        });

        return L.marker(latlng, {icon, draggable: true, index})
            .on('contextmenu', this.onRemoveMarker, this)
            .on('dragend', this.onDragMarker, this)
    }


}

const area = lmap => {
    const area = new Area().addTo(lmap);
    lmap.on('contextmenu', area.onAddMarker, area);
}

export default area;