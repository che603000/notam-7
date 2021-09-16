// const validate = (value: string, length: number, min: number, max: number) => {
//     const val = parseInt(value);
//     return value.length === length && min <= val && val < max;
// }


export const parseLat = (str) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error('parse Lat error');
    const [, d, m, s, attr] = match;
    // if (!(validate(d, 2, 0, 90) && validate(m,2, 0, 60) && validate(s,2, 0, 60)))
    //     throw Error('parse Lat error');

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + (parseInt(m) + parseInt(s || "0") / 60) / 60).toPrecision(6) * k;
}

export const parseLng = (str) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error('parse Lng error');
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + (parseInt(m) + parseInt(s || "0") / 60) / 60).toPrecision(6) * k;
}

export const parseCoords = (str) => {
    const match = str.match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
    if (!match) throw Error('parse Coord error');
    const [, lat, lng] = match;
    return {
        lat: parseLat(lat),
        lng: parseLng(lng)
    }
}

