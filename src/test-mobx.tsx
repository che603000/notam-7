import {makeObservable, observable} from "mobx";
import {observer} from "mobx-react";
import {generate} from 'shortid'

class DataList {
    items: any = []

    constructor() {
        makeObservable(this, {
            items: observable.shallow
        })
    }
}

const data = new DataList();


export const List = observer(() => {

    const onAdd = () => {
        data.items.push({title: "Items", id: generate()})
    }
    const onRemove = (id: string) => {
        data.items = data.items.filter((item: any) => item.id !== id)
        //data.items.push({title: "Items", id: generate()})
    }

    return (
        <div>
            <button onClick={onAdd}>ADD</button>
            <span> </span>

            <br/>
            <ul>
                {data.items.map((item: any) => <li key={item.id}>
                    {item.title} {item.id}
                    <span> </span>
                    <button onClick={() => onRemove(item.id)}>REMOVE</button>
                </li>)}
            </ul>
        </div>
    )
})