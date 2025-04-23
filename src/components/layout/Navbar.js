import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > navbar.clientHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BSNavbar 
      id="mainNavbar" 
      expand="md" 
      fixed="top" 
      className="py-0 w-100"
      style={{ backgroundColor: '#e6f2ff' }}
    >
      <Container fluid className="px-0">
        {/* Brand and navigation links on the left */}
        <div className="d-flex">
          <BSNavbar.Brand as={Link} to="/">PAWS</BSNavbar.Brand>
          <Nav className="d-none d-md-flex">
            <Nav.Link as={NavLink} to="/" end>HOME</Nav.Link>
            <Nav.Link as={NavLink} to="/about">ABOUT</Nav.Link>
            <Nav.Link as={NavLink} to="/adoption">ADOPTION</Nav.Link>
          </Nav>
        </div>

        {/* Auth links on the right */}
        <Nav className="d-none d-md-flex ms-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/profile" className="auth-link">
                <i className="fas fa-user-circle me-1"></i>
                {currentUser.name.toUpperCase()}
              </Nav.Link>
              <Button
                onClick={logout}
                variant="link"
                className="nav-link auth-link"
                style={{
                  textDecoration: 'none',
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                }}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" className="auth-link me-2">LOGIN</Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="auth-link">REGISTER</Nav.Link>
            </>
          )}
        </Nav>

        {/* Mobile menu toggle */}
        <BSNavbar.Toggle aria-controls="navLinks" className="d-md-none" />

        {/* Mobile menu */}
        <BSNavbar.Collapse id="navLinks">
          <Nav className="d-md-none">
            <Nav.Link as={NavLink} to="/" end>HOME</Nav.Link>
            <Nav.Link as={NavLink} to="/about">ABOUT</Nav.Link>
            <Nav.Link as={NavLink} to="/adoption">ADOPTION</Nav.Link>
          </Nav>

          {/* Mobile auth links */}
          <Nav className="d-md-none mt-3 border-top pt-3">
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/profile">
                  <i className="fas fa-user-circle me-1"></i>
                  {currentUser.name.toUpperCase()}
                </Nav.Link>
                <Button
                  onClick={logout}
                  variant="link"
                  className="nav-link"
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">LOGIN</Nav.Link>
                <Nav.Link as={NavLink} to="/register">REGISTER</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
