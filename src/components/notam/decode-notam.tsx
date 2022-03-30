import {ListGroup} from 'react-bootstrap';
import model from '../../store/app-store';
import {observer} from 'mobx-react';
//import {Decode} from "notam-lib/dist/index";
//import IItem = Decode.FieldE.IItem;

//
// const Item = (props: any) => {
//     return (
//         <ListGroup.Item>
//             <strong>{props.type}</strong>
//             <br/>
//             {props.alts && <div>{props.alts.text}</div>}
//             <div style={{overflow:"auto", fontSize:12}}>{props.source}</div>
//         </ListGroup.Item>
//     )
// }
//
// const DecodeNotam = () => {
//     // const onChange = (e: any) => {
//     //     model.setText(e.target.value);
//     // }
//     const decode = model.decode;
//     if (!decode)
//         return null;
//
//
//     return (
//         <>
//             <pre className="form-control">{decode.E.text}</pre>
//             <div className="form-control">{decode.E.regime}</div>
//             <label className="form-label">Полигоны</label>
//             <ListGroup>
//                 {decode.E.items.map((item:any) => <Item key={`${item.source}`} {...item}/>)}
//             </ListGroup>
//         </>
//     )
// }
//
// export default observer(DecodeNotam);