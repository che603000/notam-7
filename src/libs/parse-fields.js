import {FIELDS} from './const';

export const getField = (text, name) => {
    const reg = `${name}\\)(.+?)([${FIELDS.join('')}]\\)|$)`;
    const match = text.match(new RegExp(reg, 'si'));
    return match ? match[1] : undefined;
}

export const parseFieldNotam = (text) => {
    return  FIELDS.reduce((res, name) => {
        res.set(name, getField(text, name));
        return res;
    }, new Map());
}