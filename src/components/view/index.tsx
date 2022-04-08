import {Row, Col} from "react-bootstrap"
import PanelMap from "../panel-map"
import {PanelNotam} from "./panel-notam";
import * as DI from '../../container-di';
import {ModelCircle} from "../../models/geoms/circle";
import {ModelLine} from "../../models/geoms/line";



export const ViewNotam = () => {
    return (
        <Row>
            <Col sm={5}>
                <PanelNotam/>
            </Col>
            <Col sm={7}>
                {/*<PanelMap/>*/}
            </Col>
        </Row>
    )
}