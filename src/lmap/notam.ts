 import L from 'leaflet';
// import {autorun, reaction} from 'mobx';
// import notamStore from '../store/notam-model';
//
// const options = {
//     weight: 2,
//     color: 'darkgoldenrod',
//     fillColor: 'darkgoldenrod',
//     fillOpacity: 0
//
// }
//
// // eslint-disable-next-line import/no-anonymous-default-export
// export default (lmap: L.Map) => {
//     const group = L.layerGroup().addTo(lmap);
//
//     reaction(
//         () => notamStore.selectIndex,
//         selectIndex => {
//             group.getLayers().forEach((layer, index: number) => {
//                 (layer as L.Path).setStyle({fillOpacity: selectIndex === index ? 0.6 : 0});
//             });
//         }
//     )
//
//     autorun(
//         () => {
//             const model = notamStore.model;
//             console.log(model);
//             group.clearLayers();
//             const {polygons} = model;
//             polygons.forEach((p: any, index: number) => {
//                 switch (p.type) {
//                     case 'area':
//                         L.polygon(p.path, options).addTo(group);
//                         break;
//                     case 'circle':
//                         L.circle(p.center, {...options, radius: p.radius.value * 1000}).addTo(group);
//                         break;
//                     case 'strip':
//                         L.geoJSON(p.geoJson, {style: () => options}).addTo(group);
//                         L.polyline(p.path, options).addTo(group);
//                         break
//                 }
//             })
//             const location = L.circle(model.position, {
//                 radius: model.radius.value * 1852,
//                 fill: false,
//                 dashArray: '5 10',
//                 opacity: 0.5
//             }).addTo(group)
//             lmap.fitBounds(location.getBounds());
//         })
//
// }