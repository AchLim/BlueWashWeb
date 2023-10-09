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
    Button
} from 'reactstrap';
import './WebNavbar.css';

function WebNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" expand="md">
            <NavbarBrand tag={Link} to="/">Purchases Web</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/purchase_order">Purchase Order</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/vendor">Vendor</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/bank">Bank</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default WebNavbar;