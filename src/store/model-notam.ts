import {makeObservable, observable, action, computed} from 'mobx';

import {IGeom, ModelGeom} from '../models/geoms/base';
import {Geometries} from '../models/geoms/';
//import {ModelLine} from "../models/geoms/line";

/*const notamText = `(Ь8409/21 НОТАМН
Щ)УЛЛЛ/ЩРТЦА/ИЖ/БО/В/000/050/5850С03241В030
А)УЛЛЛ Б)2110180700 Ц)2110232100
Д)18-23 0700-2100
Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА:
1. ОКРУЖНОСТЬ РАДИУС 3.5КМ ЦЕНТР 585200С0314400В ПОВЕРХНОСТЬ-1200М СР.УР.МОРЯ.
2. ПОЛОСА ШИРИНОЙ ПО 2КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА 585200С0314400В-584800С0321200В. 850М СР.УР.МОРЯ-1200М СР.УР.МОРЯ.
3. ОКРУЖНОСТЬ РАДИУС 3.5КМ ЦЕНТР 584800С0321200В ПОВЕРХНОСТЬ-1500М СР.УР.МОРЯ.
4. ПОЛОСА ШИРИНОЙ ПО 2КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА 584800С0321200В-584300С0323300В-584400С0325100В. 1200М СР.УР.МОРЯ-1500М СР.УР.МОРЯ.
5. ОКРУЖНОСТЬ РАДИУС 3.5КМ ЦЕНТР 584400С0325100В ПОВЕРХНОСТЬ-1500М СР.УР.МОРЯ.
6. ПОЛОСА ШИРИНОЙ ПО 2КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА 584400С0325100В-584700С0333700В. 1200М СР.УР.МОРЯ-1500М СР.УР.МОРЯ.
(ВР6264).
Ф)ПОВЕРХНОСТЬ Г)1500 М СР.УР.МОРЯ)`;*/

export class ModelNotam {

    undoItem?: ModelGeom;
    geometries = new Geometries()
    editableId: string = ''

    get text() {
        return this.geometries.items.map((item, index) => `${index + 1}. ${item.toText()}`).join('\n');
    }

    constructor() {
        makeObservable(this, {
            editableId: observable,

            text: computed,
            setEdit: action.bound,
        });
    }

    setEdit(cid: string = '') {
        this.editableId = cid;
    }
}

const notam = new ModelNotam();


export default notam;