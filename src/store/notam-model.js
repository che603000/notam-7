import {makeObservable, observable, computed, action} from 'mobx';
import {decodeNotam, Model} from 'notam-xone-exp/src';

const notamText = `(Ь7023/21 НОТАМН
Щ)УЛЛЛ/ЩРТЦА/ИЖ/БО/В/000/030/6041С02925В010
А)УЛЛЛ Б)2109080600 Ц)2109131600
Д)08-13 0600-1600
Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА:
1. ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 604200С0292500В ПОВЕРХНОСТЬ-900М СР.УР.МОРЯ.
2. РАЙОН: 604404С0290815В-604404С0293547В-603726С0294119В-  603719С0293302В-603446С0293302В-603457С0290828В-  604404С0290815В 700М СР.УР.МОРЯ-900М СР.УР.МОРЯ.
3. РАЙОН: 604404С0290815В-604404С0293547В-603726С0294119В-  603719С0293302В-603446С0293302В-603457С0290828В-  604404С0290815В 250М СР.УР.МОРЯ-290М СР.УР.МОРЯ.
(МР2613).
Ф)ПОВЕРХНОСТЬ Г)900 М СР.УР.МОРЯ)`;

const text =`(Ь7119/21 НОТАМН\\nЩ)УЛЛЛ/ЩРТЦА/ИЖ/БО/В/000/010/6041С02901В005
А)УЛЛЛ Б)2109110600 Ц)2109161700
Д)11-16 0600-1700
Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГ ПРОСТРАНСТВА:
1. ОКРУЖНОСТЬ РАДИУС 0.5КМ ЦЕНТР 604400С0285500В ПОВЕРХНОСТЬ-200М СР.УР.МОРЯ.
2. ПОЛОСА ШИРИНОЙ ПО 2КМ В ОБЕ СТОРОНЫ ОТ ОСИ МАРШРУТА 604200С0285100В-604400С0285500В-604300С0290300В- 603900С0285500В-604300С0290300В-603900С0291000В. 150М СР.УР.МОРЯ-200М СР.УР.МОРЯ.
(МР2641 РЕЖИМ НЕ РАСПРОСТРАНЯТЬ НА БВС SUPERCAM-S350).
Ф)ПОВЕРХНОСТЬ Г)200 М СР.УР.МОРЯ)`

class Notam {

    selectIndex = -1;
    text = "";

    get decode() {
        return decodeNotam(this.text);
    }

    get model() {
        return Model.parse(this.decode);
    }

    constructor(text) {
        makeObservable(this, {
            text: observable,
            selectIndex: observable,

            decode: computed,
            model: computed,

            setText: action,
            setSelect: action
        });
        text && this.setText(text);
        this.selectIndex = -1;
    }

    setText(text) {
        this.text = text;
    }

    setSelect(index) {
        if (index === this.selectIndex)
            this.selectIndex = -1;
        else
            this.selectIndex = index;

        console.log(this.selectIndex);
    }
}

export default new Notam(text);