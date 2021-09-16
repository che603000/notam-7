import {useEffect} from "react";
import initMap from '../lmap'

const View = (props: any) => {
    useEffect(() => initMap(), []);
    return (
        <div id="map-id" className="panel-map"/>
    )
}

export default View;