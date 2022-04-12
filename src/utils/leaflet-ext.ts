import L from 'leaflet';
import num from "numeral";
import util from "leaflet-geometryutil";

export const parseLat = (str: string) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error('parse Lat error');
    const [, d, m, s, attr] = match;

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseLng = (str: string) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error('parse Lng error');
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export namespace LExt {

    export class LatLng extends L.LatLng {

        toPosition() {
            const {lat, lng} = this;
            return [lat, lng];
        }

        toCoords() {
            const {lat, lng} = this

            const mLat = lat % 1 * 60;
            const sLat = mLat % 1 * 60;

            const mLng = lng % 1 * 60;
            const sLng = mLng % 1 * 60;

            return [lat, mLat, sLat]
                    .map(value => num(value | 0).format('00'))
                    .join('') + (lat > 0 ? 'N' : 'S') +
                [lng, mLng, sLng]
                    .map((value, index) => num(value | 0).format(index === 0 ? '000' : '00'))
                    .join('') + (lat > 0 ? 'E' : 'W');

        }

        middleTo(latlng: LatLng) {
            const lat = (this.lat + latlng.lat) / 2;
            const lng = (this.lng + latlng.lng) / 2;
            return new LatLng(lat, lng)
        }

        destinationTo(heading: number, distance: number) {
            return util.destination(this, heading, distance);
        }

        static parseCoords(coords: string) {
            if (!coords)
                throw Error('parse Coord error');
            const match = coords.match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
            if (!match) throw Error('parse Coord error');

            const [, lat, lng] = match;
            return new LExt.LatLng(parseLat(lat), parseLng(lng));
        }
    }

    export const latLng = (latlng: L.LatLngExpression) => {
        const {lat, lng} = L.latLng(latlng);
        return new LExt.LatLng(lat, lng);

    }
}

