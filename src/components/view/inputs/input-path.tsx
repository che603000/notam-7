import {Form} from 'react-bootstrap';


export const PathInput = (props: any) => {
    const {value, error} = props;
    const onChange = (e: any) => {
        const val = (e.target.value || "").toUpperCase().trim();
        props.onChange && props.onChange(val);
    }
    return (
        <>
            <Form.Label>Путь</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={value}
                onChange={onChange}
                placeholder="5600N04312-5600N04412-..."
                isInvalid={!!error}
                type="text"
            />
            <Form.Control.Feedback type="invalid">
                <small>{error}</small>
            </Form.Control.Feedback>
        </>
    )
}
