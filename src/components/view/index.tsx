import {Row, Col} from "react-bootstrap"
import PanelMap from "../panel-map"
import {PanelNotam} from "./panel-notam";

export const ViewNotam = () => {
    return (
        <Row>
            <Col sm={5}>
                <PanelNotam/>
            </Col>
            <Col sm={7}>
                <PanelMap/>
            </Col>
        </Row>
    )
}