import numeral from 'numeral';

export const parseLat = (str: string) => {
    const match = str.match(/(\d{2})(\d{2})(\d{0,2})([NSCСЮ])/);
    if (!match) throw Error(`Invalid parse Lat. source = ${str}`);
    const [, d, m, s, attr] = match;

    const k = (attr === 'S' || attr === 'Ю') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseLng = (str: string) => {
    const match = str.match(/(\d{3})(\d{2})(\d{0,2})([EWЕЗВ])/)
    if (!match) throw Error(`Invalid parse Lng. source = ${str}`);
    const [, d, m, s, attr] = match;
    const k = (attr === 'W' || attr === 'З') ? -1 : 1;
    return +(parseInt(d) + parseInt(m) / 60 + parseInt(s || "0") / 3600).toFixed(4) * k;
}

export const parseCoords = (str: string): [number, number] => {
    if (!str)
        return [0, 0];
    const match = str.replace(/ /g, '').match(/(\d{4,6}[NSCСЮ])(\d{5,7}[EWЕЗВ])/);
    if (!match) throw Error(`Invalid coord. source= ${str}`);
    const [, lat, lng] = match;
    return [parseLng(lng), parseLat(lat)];
}

export const selectCoords = (text: string) => text.match(/(\d{4,6}[СNЮS]\d{6,7}[ВЗEW][\s\S]+?[^0-9\-СВ\n\s])/);

export const parsePath = (text: string) => {
    const res = text.match(/(\d{4,6}[СNЮS]\d{5,7}[ВЗEW])/g);
    if (res)
        return res.map(coords => parseCoords(coords));
    else
        return [];
}

export const latToCoords = (value: number) => {
    const postfix = value > 0 ? 'С' : 'Ю';
    const deg = value | 0;
    const min = ((value - deg) * 60) | 0;
    const sec = Math.round((value - deg - min / 60) * 3600);
    return `${numeral(deg).format('00')}${numeral(min).format('00')}${numeral(sec).format('00')}${postfix}`;
}
export const lngToCoords = (value: number) => {
    const postfix = value > 0 ? 'В' : 'З';
    const deg = value | 0;
    const min = ((value - deg) * 60) | 0;
    const sec = Math.round((value - deg - min / 60) * 3600);
    return `${numeral(deg).format('000')}${numeral(min).format('00')}${numeral(sec).format('00')}${postfix}`;
}

export const positionToCoords = (position: [number, number]) => `${latToCoords(position[0])}${lngToCoords(position[1])}`;

