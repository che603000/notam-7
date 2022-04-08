import './index.css';

import {fetch} from '../../api/api-notam';
import {FilterPanel} from './filter';
import {ItemsPanel} from './items';
import {useEffect, useState} from "react";

export const Search = (props: any) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch()
            .then((data: any) => data.items)
            .then((items: never[]) => setItems(items.splice(0, 100)));
    }, [])

    console.log(items);
    return (
        <div className="app-search-panel">
            <FilterPanel/>
            <ItemsPanel items={items}/>
        </div>
    )
}