import React from "react";
import HomeStyle from "./home.module.scss";

const Home: React.FC = () => (
  <div className={HomeStyle.Home}>
    <div className={HomeStyle.MainButton}>
      <a href="/order">Order Now</a>
    </div>
  </div>
);

export default Home;
