import L from 'leaflet';
import modelNotam from '../store/model-notam';
import {autorun} from "mobx";
import {circleMap} from './circle';
import {stripMap} from './line';


class MapNotam extends L.LayerGroup {

    layers = {}
    options = {
        color: '#660',
        fill: true,
        fillColor: '#990',
        fillOpacity: 0.1
    }


    onAdd(map) {
        this.dispose = autorun((r) => this.onRender(modelNotam));
        return this;
    }

    onRemove(map) {
        this.dispose();
        return this;
    }

    onRender(notam) {
        //this.clearLayers();
        if (!notam)
            return;

        const {items, editableId} = notam;

        // remove layer для которых нет item
        this.getLayerKeys().forEach(cid => {
            if (items.some(item => item.cid === cid))
                return;
            this.removeLayerItem(cid);
        })
        //update
        items.forEach(item => {
            const layer = this.getLayerItem(item);
            if (!layer)
                return;
            layer.setItem(item);
            layer.setEdit(editableId === item.cid);
        });
        // add layer
        items.forEach(item => {
            if (this.hasLayerItem(item))
                return;
            const layer = this.createLayer(item);
            this.addLayerItem(layer);
            layer.setEdit(editableId === item.cid);
        });

        if (!editableId)
            this.fitBounds();
    }

    fitBounds() {
        const bounds = this.getLayerItems()
            .map(layer => layer.getBounds());

        const allBounds = bounds.reduce((res, bb, index) => {
            const nextBounds = bounds[index + 1];
            if (nextBounds)
                return res.extend(nextBounds);

            return res;
        }, bounds[0]);

        allBounds && this._map.fitBounds(allBounds);
    }

    createLayer(item) {
        if (item.type === 'ModelCircle') {
            const layer = this.createCircle(item);
            layer.on('edit', (e) => {
                console.log(e);
                if (modelNotam.editableId === e.cid) {
                    const item = layer.options.item;
                    modelNotam.setItem(item)
                } else {

                    modelNotam.setEdit(e.cid);
                }
            })
            return layer;
        }
        if (item.type === 'ModelLine') {
            return this.createLine(item);
        }
    }

    createLine(item) {
        const {cid, path, width} = item;
        return stripMap(path, width * 1000, {
            item,
            cid
        })
    }

    createCircle(item) {
        const {cid, center, radius} = item;
        return circleMap(center, radius * 1000, {
            item,
            cid
        })
    }

    addLayerItem(layer) {
        const cid = layer.options.cid;
        this.layers[cid] = layer;
        this.addLayer(layer)
    }

    removeLayerItem(layer) {
        if (typeof layer === 'string') {
            const cid = layer;
            this.removeLayer(this.layers[cid]);
            delete this.layers[cid];
        } else {
            this.removeLayer(layer);
            delete this.layers[layer.options.cid];

        }

    }

    getLayerItem(item) {
        const cid = typeof item === 'string' ? item : item.cid;
        return this.layers[cid];
    }

    getLayerItems() {
        return Object.values(this.layers);
    }

    hasLayerItem(item) {
        const cid = typeof item === 'string' ? item : item.cid;
        return cid in this.layers;
    }

    getLayerKeys() {
        return Object.keys(this.layers);
    }
}

const mapNotam = lmap => {
    //const mapNotam =
    new MapNotam().addTo(lmap);
    // lmap.on('contextmenu', area.onAddMarker, area);
}

export default mapNotam;