import {Form} from 'react-bootstrap';

export type TPropsInputLength = {
    value: number
    title: string,
    description?: string,
    error?: string
    onChange(value: number): void
}

export const LengthInput = (props: TPropsInputLength) => {
    const {value, title, description = "", error} = props;
    const onChange = (e: any) => {
        const val = (e.target.value || "").toUpperCase().trim();
        props.onChange && props.onChange(+val);
    }
    return (
        <>
            <Form.Label>{title}</Form.Label>
            <Form.Control
                value={value}
                onChange={onChange}
                min={0}
                step={0.1}
                //pattern="[0-9]+(\,[0-9])?"
                type="number"
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                <small>{error}</small>
            </Form.Control.Feedback>
            {!error && description && <Form.Text muted>
                <small>{description}</small>
            </Form.Text>}
        </>
    )
}
