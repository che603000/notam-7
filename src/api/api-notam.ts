//import axios from 'axios';
import notams from '../data/notam.json';
import {createNotam} from "../libs/notam";
import {IModelNotam} from "../libs/notam/interface";

export const parseNotam = (data: any) => {
    const {items, ...props} = data;
    return {
        ...props,
        items: items.map((item: any) => createNotam(item.description)).filter((d: IModelNotam) => d.props.subject === "RT")
    }
}

export const fetch = () => {
    //const url = '';
    // return axios.get(url)
    //     .then(res => res.data);
    return Promise.resolve(parseNotam(notams));
}
