import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
import './css/Home.css'


const Header = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#top">TheGoodPlates</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="../screens/Home.js#login-section">Login</Nav.Link> */}
            <Nav.Link href="../screens/Home.js#location-section">Location</Nav.Link>
            <Nav.Link href="../screens/Home.js#preference-section">Preferences</Nav.Link>
            <Nav.Link href="../screens/Home.js#recommended-section">Recommended</Nav.Link>
            <Nav.Link href="../screens/Home.js#liked-section">Liked Restaurants</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header;