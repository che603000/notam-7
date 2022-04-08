import React from 'react';
//import PanelNotam from './components/notam/panel-notam';
// //import PanelAlts from './components/panel-alts';
//
// import PanelMap from './components/panel-map';
import {Container} from "react-bootstrap";
import {Search} from './components/search';
import {NavBar} from "./components/navbar";
import {Route, Routes} from 'react-router-dom';
import {ViewNotam} from "./components/view";

import {List} from './test-mobx'
import './map-test';
// const notamText = `(Х6727/21 НОТАМН
// Щ)УУВЖ/ЩРТЦА/ИЖ/БО/В/000/030/5647С04016В017
// А)УУВЖ Б)2109140700 Ц)2109172100
// Д)14-17 0700-2100
// Е)ЗАПРЕЩЕНО ИСПОЛЬЗОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА РАЙОН:
// 565600С0403500В-565200С0403500В-564900С0402700В-564300С0404100В-
// 563600С0403800В-563800С0395800В-564600С0395300В-565100С0400400В-
// 565700С0402000В-565600С0403500В
// (МР024579).
// Ф)ПОВЕРХНОСТЬ
// Г)725 М СР.УР.МОРЯ)`;
//
// const d= decode(notamText);
// const n = Notam.parse(d)
// console.log(n);
// debugger;

function App() {
    return (
        <Container fluid>
            <NavBar/>
            <div style={{height: '56px'}}/>
            <ViewNotam/>
            {/*<Routes>*/}
            {/*    <Route path="/" element={<Search/>}/>*/}
            {/*    <Route path="view" element={<ViewNotam/>}/>*/}
            {/*    /!*<Route path="invoices" element={<Invoices />} />*!/*/}
            {/*</Routes>*/}
        </Container>
    );
}

export default App;
