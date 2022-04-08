import {Form} from 'react-bootstrap';
import {useState} from "react";
import {LExt} from "../../../utils/leaflet-ext";

const validateCoords = (val = "") => {

    if (/^[0-8][0-9][0-5][0-9][NSСЮ]0[0-8][0-9][0-5][0-9][WEЗВ]$/.test(val))
        return ''

    if (/^[0-8][0-9][0-5][0-9][NSСЮ]1[0-7][0-9][0-5][0-9][WEЗВ]$/.test(val))
        return ''

    // if (/^\d{4}[NSСЮ]\d{5}[WEЗВ]$/.test(val))
    //     return ''

    if (/^[0-8][0-9]([0-5][0-9]){2}[NSСЮ]0[0-8][0-9]([0-5][0-9]){2}[WEЗВ]$/.test(val))
        return ''

    if (/^[0-8][0-9]([0-5][0-9]){2}[NSСЮ]1[0-7][0-9]([0-5][0-9]){2}[WEЗВ]$/.test(val))
        return ''


    return 'Неверно введена координата';
}

export type TCoordsProps = {
    value: string
    title: string
    description?: string
    error?: string

    onChange(value: string): void
}

export const CoordsInput = (props: TCoordsProps) => {
    const {value, title, error, description} = props;
    const onChange = (e: any) => {
        const center = (e.target.value || "").toUpperCase().trim();
        props.onChange && props.onChange(center);
    }
    return (
        <>
            <Form.Label>{title}</Form.Label>
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
                <small>{description}</small>
            </Form.Text>
            }
        </>
    )
}
