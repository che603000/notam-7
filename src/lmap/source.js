import L from 'leaflet';
import model from '../store/app-store';
import {autorun} from "mobx";


const ERROR_COLOR = "#990"
const SUCCESS_COLOR = "#AAF";

class Area extends L.LayerGroup {

    options = {
        //dashArray: '3 3',
        color: '#99F',
        weight: 10,
        opacity: 0.3,
        fill: false
    }


    onAdd(map) {
        this.dispose = autorun(() => this.onRender(model.decode));
        return this;
    }

    onRemove(map) {
        this.dispose();
        return this;
    }

    onRender(decode) {
        this.clearLayers();
        if (!decode)
            return;
        decode.E.items.forEach((item, index) => {
            const {type} = item;
            switch (type) {
                case 'circle': {
                    const {center, radius} = item;
                    this.createCircle(center, radius.valuation * 1000)
                }
                default: {
                    const {path = []} = item;
                    this.createLine(path, this.options);

                }

            }
        });
    }


    createLine(path) {
        // debugger;
        // path.forEach((latlng, index) => {
        //     this.createMarker(latlng, index).addTo(this);
        // });
        L.polyline(path, this.options).addTo(this);
    }

    createCircle(center, radius) {
        L.circle(center, radius, this.options).addTo(this);
    }

    createMarker(latlng, index) {
        const icon = L.divIcon({
            className: 'my-div-icon',
            html: index.toString(),
            iconSize: [24, 24],
        });

        return L.marker(latlng, {icon, draggable: true, index})
    }


}

const area = lmap => {
    const area = new Area().addTo(lmap);
    //lmap.on('contextmenu', area.onAddMarker, area);
}

export default area;