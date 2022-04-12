import './index.css';
import L from 'leaflet';
import modelNotam from '../store/model-notam';
import {autorun} from "mobx";
import * as DI from '../container-di'


class MapNotam extends L.LayerGroup {

    layers = {}
    disposers = []

    onAdd(map) {
        this.disposers.push(autorun((r) => this.onRender(modelNotam)));
        this.disposers.push(autorun((r) => this.onEdit(modelNotam)));
        return super.onAdd(map);
    }

    onRemove(map) {
        this.disposers.forEach(disposer => disposer());
        return super.onRemove(map);
    }

    onRender(notam) {
        if (!notam)
            return;

        const {geometries} = notam;

        // remove layer для которых нет model
        this.getLayerItems().forEach(layer => {
            if (geometries.items.some(model => model.cid === layer.cid))
                return;
            this.removeLayerItem(layer);
        })

        // add layer для которых нет model
        geometries.items.forEach(model => {
            if (this.hasLayerItem(model))
                return;
            const layer = this.createLayer(model);
            this.addLayerItem(layer);
        });

        this.fitBounds();
    }

    onEdit(notam) {
        if (!notam)
            return;

        const {editableId} = notam;

        this.getLayerItems().forEach(layer => {
            const isEdit = layer.cid === editableId;
            layer.setEdit(isEdit);
        })
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
        const {layer: Layer} = DI.getMetaData(item.type);
        if (!Layer)
            throw new Error(`Not found Layer for key =${item.type.name}`)

        const layer = Layer.create(item);
        layer.on('edit', (e) => {
            const cid = modelNotam.editableId === e.cid ? '' : e.cid;
            modelNotam.setEdit(cid);
        });
        return layer;
    }

    addLayerItem(layer) {
        this.layers[layer.cid] = layer;
        this.addLayer(layer)
    }

    removeLayerItem(layerOrCid) {
        const layer = typeof layerOrCid === 'string' ? this.layers[layerOrCid] : layerOrCid;
        layer.off();
        delete this.layers[layer.cid];
        this.removeLayer(layer);
    }

    getLayerItem(model) {
        const cid = typeof model === 'string' ? model : model.cid;
        return this.layers[cid];
    }

    getLayerItems() {
        return Object.values(this.layers);
    }

    hasLayerItem(model) {
        const cid = typeof model === 'string' ? model : model.cid;
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