import React from "react";
import Form from "./Form"
import { Route, Switch, Link } from "react-router-dom"

const App = () => {
  return (
    
      <div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/pizza">Pizza</Link>
        </nav>
          <Route exact path="/">
            <h1>Lambda Eats</h1>
          </Route>
          <Route path="/pizza">
            <Form />
          </Route>
      </div>
      
  );
};
export default App;
