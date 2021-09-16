//import {parseFieldNotam} from '../libs/parse-fields';

const NotamFields = (props: any) => {
    const {value} = props;
    const fields = Object.keys(value)
        .filter(key => key !== 'text')
        .map(key => ([key, value[key].text || value[key].toString()]));
    return (
        <div>
            {fields.map(([key, value]) => <div key={key}>{key} - {value}</div>)}
        </div>
    )
}

export default NotamFields;