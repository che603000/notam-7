import options from './config';

const store = new Map();

export const setMetaData = <TMeta>(type: any, options: TMeta, group?: any) => {
    store.set(type, options);

    if (!group)
        return;

    if (!store.has(group))
        store.set(group, new Array<any>());

    store.get(group).push(type);
}

export const getMetaData = <TMeta>(type: any) => {
    if (!store.has(type))
        throw new Error(`Not fount meta for ${type.name}`)
    return store.get(type) as TMeta;
}

export const getKeysGroup = (group: any) => {
    if (!store.has(group))
        throw new Error(`Not fount meta group for ${group.name}`)

    return store.get(group) as any[];
}


options.forEach(item => {
    const {key, data, group} = item;
    setMetaData(key, data, group);
})