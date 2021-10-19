import L from 'leaflet';
import model from '../store/app-store';
import {autorun} from "mobx";


const ERROR_COLOR = "#990"
const SUCCESS_COLOR = "#AAF"

class Area extends L.LayerGroup {

    options = {
        color: '#660',
        fill: true,
        fillColor: '#990',
        fillOpacity: 0.1
    }


    onAdd(map) {
        this.dispose = autorun(() => this.onRender(model.notam));
        //this.disposeValid = autorun(() => this.onValid(model.valid));
        return this;
    }

    onRemove(map) {
        this.dispose();
        return this;
    }

    onRender(notam) {
        this.clearLayers();
        if (!notam)
            return;
        const bounds = [];
        notam.polygons.forEach((geoJson, index) => {
            console.log(geoJson);
            const pol = L.geoJSON(geoJson, {
                style: (feature) => this.options
            }).addTo(this);
            bounds.push(pol.getBounds());
            //this.createMarker(latlng, index).addTo(this);
            //L.polygon(path, this.options).addTo(this);
        });

        const b = bounds.reduce((res, bb, index) => {
            const nextBounds = bounds[index + 1];
            if (nextBounds)
                return res.extend(nextBounds);

            return res;
        }, bounds[0]);

        this._map.fitBounds(b);
    }

    /*    onAddMarker(e) {
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
        }*/


}

const area = lmap => {
    const area = new Area().addTo(lmap);
    lmap.on('contextmenu', area.onAddMarker, area);
}

export default area;