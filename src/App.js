import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/pizza" component={PizzaForm} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};
export default App;
