import './index.css';
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap"
import {TDataUnit, TTitleUnits} from "../models/units";


export type TUnitProps = {
    units: TTitleUnits
    value: TDataUnit
    max: number
    min: number

    onChange: (data: TDataUnit) => void
}

export const Unit = (props: TUnitProps) => {
    const {units, value: data, max, min} = props;

    const unit = units.getTile(data.unit);

    const onUnit = (key: string | null) => {
        props.onChange({...data, unit: key} as TDataUnit)
    }

    const onValue = (e: any) => {
        const val = +e.target.value;
        props.onChange({...data, value: val} as TDataUnit)
    }

    return (
        <InputGroup bsPrefix="input-group unit-input-group">
            <FormControl
                type="number"
                value={data.value}
                max={max}
                min={min}
                onChange={onValue}
            />

            <DropdownButton
                className="test"
                variant="outline-secondary"
                title={unit?.title}
                onSelect={onUnit}
                id="input-group-dropdown-2"
                align="end"
            >
                {units.items.map(item => {
                    const {unit, title} = item;
                    return <Dropdown.Item key={unit} eventKey={unit}>{title}</Dropdown.Item>
                })}
            </DropdownButton>
        </InputGroup>

    )
}