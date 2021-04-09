import React, {useContext} from "react";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button, Container
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {UserContext} from "../services/provider/UserProvider";
import {auth} from "../services/firebase/firebaseIndex";

let HeadNavbar = () => {
    const user = useContext(UserContext)

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>Amazing Book Store</Navbar.Brand>
                </LinkContainer>
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="books">
                        <Nav.Link>Books</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="authors">
                        <Nav.Link>Authors</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="publishers">
                        <Nav.Link>Publishers</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                { !user ?
                    <Nav>
                        <LinkContainer to="signin">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="signup">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    :
                    <div className="ml-3">
                        <Navbar.Text>
                            Signed as: {user.displayName}
                        </Navbar.Text>
                        <Button size="sm" className="ml-1" variant="outline-success" onClick={() => {auth.signOut()}}>Sign Out</Button>
                    </div>
                }
            </Navbar>
        </div>
    )
}


export default HeadNavbar;