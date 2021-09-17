import {useEffect} from "react";
import initMap from '../lmap'

const View = (props: any) => {
    useEffect(():any => {
        const map = initMap();
        return () => map.remove();
    }, []);
    return (
        <div id="map-id" className="panel-map"/>
    )
}

export default View;