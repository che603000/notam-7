import {Form} from 'react-bootstrap';
import {useState} from "react";

const validateCoords = (coords = "") => {
    const val = (coords).toUpperCase().trim();
    if (/^\d{4,6}[NSСЮ]\d{5,7}[WEЗВ]$/.test(val))
        return ''
    else
        return 'Неверно введена координата';
}

export const AltInput = (props: any) => {
    const {value} = props;
    const [error, setError] = useState('');
    const onChange = (e: any) => {
        const val = (e.target.value || "").toUpperCase().trim();
        setError(validateCoords(val))
        props.onChange && props.onChange(val);
    }
    return (
        <>
            <Form.Label>Высота</Form.Label>
            <Form.Control
                value={value}
                onChange={onChange}
                maxLength={15}
                minLength={11}
                //placeholder = ""
                isInvalid={!!error}
                type="text"
            />
            <Form.Control.Feedback type="invalid">
                <small>{error}</small>
            </Form.Control.Feedback>
            {!error &&
            <Form.Text muted>
                <small>Высота</small>
            </Form.Text>
            }
        </>
    )
}
