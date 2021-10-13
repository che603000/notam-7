import {Form, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap';
import {Altitude} from '../store/units';

const UNITS = {
    MET: "МЕТРЫ",
    FT: "ФУТЫ",
    FL: "ЭШЕЛОН"
};

const Alts = (props: any) => {
    const id: string = props.id;
    const altValue: Altitude = props.value;

    const items = Altitude.tileItems.map(([key, title]) => {
        return <Dropdown.Item key={key} eventKey={key}>{title}</Dropdown.Item>
    });
    // @ts-ignore
    const text = Altitude.titles.get(altValue?.unit) || "MET";

    const onSelect = (key: any) => {
        props.setValue(id, altValue.value, key);
    }
    const onValue = (e: any) => {
        props.setValue(id, +e.target.value, altValue.unit);
    }

    return (
        <InputGroup className="mb-3">
            <Form.Control type="number"
                          value={altValue?.value}
                          onChange={onValue}
                          max={9999}
                          min={0}
                          step={10}
            />

            <DropdownButton
                onSelect={onSelect}
                variant="outline-secondary"
                title={text}
                id={id}
                align="end"
            >
                {items}
            </DropdownButton>
        </InputGroup>
    )
}

export default Alts;