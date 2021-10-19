import {makeObservable, observable, action} from 'mobx';
import {decode, Notam, Decode} from 'notam-lib/dist/index';

const notamText = `(Ь8409/21 НОТАМН
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
Ф)ПОВЕРХНОСТЬ Г)1500 М СР.УР.МОРЯ)`;

class AppStore {

    decode?: Decode.IDecode = undefined;
    notam?: Notam = undefined;
    text: string = notamText;


    constructor() {
        makeObservable(this, {
            text: observable,
            decode: observable.ref,
            notam: observable.ref,

            setText: action,
            setDecode: action,
        });
    }

    setText(value: string) {
        this.text = value;
        this.decode = undefined;
        this.notam = undefined;
    }

    setDecode() {
        this.decode = decode(this.text);
        this.notam = Notam.parse(this.decode);
    }
}

export default new AppStore();