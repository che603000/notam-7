import {Tabs, Tab} from 'react-bootstrap';
import {observer} from 'mobx-react';
import TextNotam from './text-notam';
import DecodeNotam from './decode-notam';
import model from '../../store/app-store';

const View = () => {
    return (
        <div className="panel-props">
            <Tabs defaultActiveKey="text" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="text" title="Text">
                    <TextNotam/>
                </Tab>
                <Tab eventKey="decode" title="Decode" disabled={!model.decode}>
                    <DecodeNotam/>
                </Tab>
                <Tab eventKey="notam" title="Notam" disabled={!model.notam}>
                    <div style={{height: 500, overflow:'auto'}}>
                        {model.notam && <pre>{JSON.stringify(model.notam, null, 4)}</pre>}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default observer(View);