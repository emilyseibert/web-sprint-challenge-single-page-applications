import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const history = useHistory();
  return (
    <div className="home">
      <div className="pizzaHero"></div>
      <button className="pizzaBtn" onClick={() => history.push("/pizza")}>
        Pizza?
      </button>
    </div>
  );
};

export default Home;
