import {parseCoords} from './coords';

// test('parse invalid coords СВ', () => {
//     const coords = '9630С043200В';
//     return Promise
//         .resolve(parseCoords(coords))
//         .catch(d => {
//             console.log(d);
//         })
//         .then(()=>{
//             throw Error('Not invalid')
//         })
//
// });

test('parse coords NE', () => {
    const coords = '563000N0432000E';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('parse coords СВ', () => {
    const coords = '563000С0432000В';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('parse coords SW', () => {
    const coords = '5630S04320W';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === -56.5 && d.lng === -43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('parse coords ЮЗ', () => {
    const coords = '5630S04320W';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === -56.5 && d.lng === -43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('parse coords N(RUS E)', () => {
    const coords = '563000N0432000Е';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('parse coords (EN С)В', () => {
    const coords = '563000C0432000Е';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});

test('shot parse coords NE', () => {
    const coords = '5630N04320E';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});
test('shot parse coords СВ', () => {
    const coords = '5630С04320В';
    return Promise
        .resolve(parseCoords(coords))
        .then(d => {
            if (d.lat === 56.5 && d.lng === 43.3333)
                return true;
            else
                throw Error('Not equal');
        })
});


