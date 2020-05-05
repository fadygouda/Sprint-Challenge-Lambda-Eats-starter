import React from "react";
import Form from "./Form"
import { Route, Switch, Link } from "react-router-dom"
import styled from "styled-components"

const Nav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background: #0083ff;
flex-direction: column;

padding: 0 16px;
border-bottom: 1px solid #efefef;
margin-bottom: 32px;
`;

const NavLinks = styled.nav`
display: flex;
justify-content: space-between;
margin: 0 auto;
`;

const Links = styled.a`
display: flex;
text-decoration: none;
color: #1c5d76;
font-weight: bold;
margin-right: 1rem;
justify-content: space-between;
`;
const App = () => {
  return (
    
      <Nav>
        <h1>Gouda's Pizzaria</h1>
        <NavLinks className="nav">
          <Links>
            <Link to="/">Home</Link>
            <Link to="/pizza">Pizza</Link>
          </Links>
        </NavLinks>
          <Route exact path="/" />
          
          <Route path="/pizza">
            <Form />
          </Route>
      </Nav>
      
  );
};
export default App;
