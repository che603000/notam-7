export const MET = "MET";
export const FT = "FT";
export const FL = "FL";

export type TAltUnit = "MET" | "FT" | "FL";

export class Altitude {
    value: number = 0;
    unit: TAltUnit = MET;

    static titles = new Map<TAltUnit, string>([
        [FT, "ФУТЫ"],
        [MET, "МЕТРЫ"],
        [FL, "ЭШЕЛОН"]
    ]);

    static tileItems = Array.from(Altitude.titles.entries());

    constructor(value: number, unit: TAltUnit) {
        this.value = value;
        this.unit = unit;
    }
}