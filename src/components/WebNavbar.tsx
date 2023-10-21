import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import './WebNavbar.css';

function WebNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="web-navbar" color="light" expand="md">
            <NavbarBrand tag={Link} to="/">Purchases Web</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/receipt">Receipt</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/vendor">Vendor</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/currency">Currency</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default WebNavbar;