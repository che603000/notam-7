import dictionarySubject from "../../dictionary/subject.json";
import {useState} from "react";

const Item = (props: any) => {
    const {data, index, onDetail} = props;
    const {id, area, schedule, alts, text, notam: {E, F, G}, props: {subject, alts: propAlts}} = data;
    // @ts-ignore
    const textSubject = dictionarySubject[subject];
    const textAlts = (alts ? alts.str : propAlts.str).split('-')


    return (
        <tr onClick={() => onDetail(id)}>
            <td>{id}</td>
            <td style={{width: '10rem'}}>{schedule.str}</td>
            <td style={{width: '12rem'}}>{F}<br/>{G}</td>
            <td>{area}</td>
            <td title={textSubject}>{subject}</td>
            <td>
                {index === id ? <pre>{text}</pre> : E}
            </td>
        </tr>
    )
}


export const ItemsPanel = (props: any) => {
    const [indexView, setIndexView] = useState('')
    const {items} = props;
    const onDetail = (id: string) => {
        id !== indexView ?setIndexView(id) : setIndexView('');
        console.log(id);
    }
    return (
        <table className="table table-hover">
            <tbody>
            {items.map((data: any) => <Item key={data.id} data={data} index={indexView} onDetail={onDetail}/>)}
            </tbody>

        </table>
    )
}