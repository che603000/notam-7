import {Navbar, Container, Nav} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

export const NavBar = () => {
    // @ts-ignore
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand href="#home">
                    FPLN NOTAM
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/">Поиск</NavLink>
                    <NavLink className="nav-link" to="/view">Просмотр</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}