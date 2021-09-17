import num from 'numeral';
import L from "leaflet";
// const validate = (value: string, length: number, min: number, max: number) => {
//     const val = parseInt(value);
//     return value.length === length && min <= val && val < max;
// }


export const parseLat = (str) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error('parse Lat error');
    const [, d, m, s, attr] = match;

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseLng = (str) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error('parse Lng error');
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseCoords = (str) => {
    if (!str)
        return [];
    const match = str.match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
    if (!match) throw Error('parse Coord error');
    const [, lat, lng] = match;
    return L.latLng(parseLat(lat), parseLng(lng));
}

export const coordsToPath = (str) => {
    if (!str)
        return [];
    return str.split('-').map(coords => parseCoords(coords));
}

export const normLatLng = latlng => {
    const {lat, lng} = latlng
    const nLat = +(((lat * 3600 + 0.5) | 0) / 3600).toFixed(4);
    const nLng = +(((lng * 3600 + 0.5) | 0) / 3600).toFixed(4);
    return L.latLng(nLat, nLng);
}

export const latLngToCoords = latlng => {
    const {lat, lng} = latlng

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

// const b = L.latLng(56.9089, 43.7897);
// const coords = latLngToCoords(b)
// const ll = parseCoords(coords)
// console.log(b, ll);