import {PropsWithChildren} from "react";
import notamStore from '../store/notam-model';
import {observer} from 'mobx-react';
import Draw from './alts-draw';


const View = (props: PropsWithChildren<any>) => {
    //const {} = props;
    const onSelect = (index: number) => notamStore.setSelect(index);


    return (
        <div className="panel-alts">
            <Draw store={notamStore} onSelect={onSelect} selectIndex={notamStore.selectIndex}/>
        </div>
    )
}

export default observer(View);