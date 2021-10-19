import {Form, Button} from 'react-bootstrap';
import model from '../../store/app-store';
import {observer} from 'mobx-react';


const TextNotam = () => {
    const onChange = (e: any) => {
        model.setText(e.target.value);
    }
    const onConvert = (e: any) => {
        e.preventDefault();
        model.setDecode();
    }

    return (
        <Form onSubmit={onConvert}>
            <Form.Group className="mb-3" controlId="text">
                <Form.Control as="textarea"
                              rows={15}
                              value={model.text}
                              onChange={onChange}
                              placeholder="текст телеграммы"
                />
                <Form.Control.Feedback type="invalid">
                    Ошибка
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Конверировать</Button>
        </Form>
    )
}

export default observer(TextNotam);