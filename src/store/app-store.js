import {makeObservable, observable, computed, action} from 'mobx';

const notamText = `(Х6727/21 НОТАМН
Щ)УУВЖ/ЩРТЦА/ИЖ/БО/В/000/030/5647С04016В017
А)УУВЖ Б)2109140700 Ц)2109172100
Д)14-17 0700-2100
Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА РАЙОН:
565600С0403500В-565200С0403500В-564900С0402700В-564300С0404100В-
563600С0403800В-563800С0395800В-564600С0395300В-565100С0400400В-
565700С0402000В-565600С0403500В
(МР024579).
Ф)ПОВЕРХНОСТЬ 
Г)725 М СР.УР.МОРЯ)`;

class AppStore {

    text = notamText;
    selectIndex = -1;
    description = `ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА РАЙОН:
565600С0403500В-565200С0403500В-564900С0402700В-564300С0404100В-
563600С0403800В-563800С0395800В-564600С0395300В-565100С0400400В-
565700С0402000В-565600С0403500В
(МР024579).`;

    constructor() {
        makeObservable(this, {
            text: observable,
            selectIndex: observable,
            description: observable,

            setText: action,
            setDescription: action,
            setSelect: action
        });
    }

    setText(value) {
        this.text = value;
        this.selectIndex = -1;
    }

    setDescription(value) {
        this.description = value;
        this.selectIndex = -1;
    }

    setSelect(index) {
        if (index === this.selectIndex)
            this.selectIndex = -1;
        else
            this.selectIndex = index;

        console.log(this.selectIndex);
    }
}

export default new AppStore();