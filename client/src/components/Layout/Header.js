import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const guestItems = (
    <>
      <LinkContainer to='/orcr'>
        <Nav.Link>Opening rank and Closing rank of previous years</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/predictor'>
        <Nav.Link>Predict college</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/login'>
        <Nav.Link>Sign in</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/register'>
        <Nav.Link>
          Sign up <i className='fas fa-user-plus'></i>
        </Nav.Link>
      </LinkContainer>
    </>
  );

  const authItems = (
    <>
      <NavDropdown
        title={
          <>
            {user && user.name + " "}
            <i className='fas fa-user'></i>
          </>
        }
        id='navbarScrollingDropdown'
      >
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        {/* <NavDropdown.Divider /> */}

        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const adminItems = (
    <>
      <NavDropdown
        title={
          <>
            <span>Admin</span>
            <i className='fas fa-user-shield ms-1'></i>
          </>
        }
        id='admin'
      >
        <LinkContainer to='/admin/users'>
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/products'>
          <NavDropdown.Item>Products</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/orders'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );

  return (
    <Navbar
      className='bg-primary shadow-lg mb-4'
      variant='dark'
      expand='lg'
      collapseOnSelect
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Test_14</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='my-2 my-lg-0 ms-auto'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {user && authItems}
            {!user && guestItems}
            {user && user.isAdmin && adminItems}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
