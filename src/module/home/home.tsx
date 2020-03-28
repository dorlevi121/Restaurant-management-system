import React from "react";
import HomeStyle from "./home.module.scss";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div className={HomeStyle.Home}>
    <Link to="/order" className={HomeStyle.MainButton}>
      <p >Order Now</p>
    </Link>
  </div>
);

export default Home;
