import React from "react";
import HomeStyle from "./home.module.scss";

const Home: React.FC = () => (
  <div className={HomeStyle.Home}>
    <a href="/order" className={HomeStyle.MainButton}>
      <p >Order Now</p>
    </a>
  </div>
);

export default Home;
