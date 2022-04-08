export const FT = 'foot'
export const FL = 'level' // ЭШЕЛОН
export const MET = 'meter'

export const KM = 'kilometer'
export const MIL = 'mile'

export const KPH = 'kph'
export const KNOTS = 'knots'

export type TTitleUnit = {
    title: string
    unit: string
}

export type TDataUnit = {
    value: number
    unit: string
}

export class TTitleUnits {

    constructor(public items: TTitleUnit[]) {
    }

    getTile(keyUnit: string | null | undefined) {
        if (keyUnit)
            return this.items.find(item => item.unit === keyUnit);
        else
            return this.items[0];
    }
}

export const unitsLength = new TTitleUnits([
    {
        title: 'МЕТР',
        unit: MET,
    },
    {
        title: 'КМ',
        unit: KM
    },
    {
        title: 'МИЛЬ',
        unit: MIL
    }
]);

export const unitsAlt = new TTitleUnits([
    {
        title: 'ФУТ',
        unit: FT,
    },
    {
        title: 'МЕТР',
        unit: MET,
    },
    {
        title: 'ЭШЕЛОН',
        unit: FL,
    }
]);

export const unitsSpeed = new TTitleUnits([
    {
        title: 'КМ/Ч',
        unit: KPH,
    },
    {
        title: 'УЗЛЫ',
        unit: KNOTS,
    }
]);
