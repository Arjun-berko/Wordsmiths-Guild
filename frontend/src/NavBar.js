import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuthenticated from './useAuthenticated';

export default function NavigationBar() {

    const {token,isAuthenticated,username} = useAuthenticated();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>WordsmithsGuild</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/post/list">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          {isAuthenticated? 
          <>
          <LinkContainer to={`/userprofile/${username}`} >
          <Nav.Link> My Profile </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`/userpost/${username}`} >
          <Nav.Link> My Posts </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/post/create">
          <Nav.Link>Create Post</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/logout">
            <Nav.Link>Log Out</Nav.Link>
          </LinkContainer>
          </>
          :
          <>
          <LinkContainer to="/login">
            <Nav.Link>Log In</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          </>
}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};


