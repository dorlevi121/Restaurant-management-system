import React, { Component } from "react";
import homeStyles from "./core.module.scss";
import Routing from "../../app.routing";
import Navogation from "./components/navigation";
import { logoImg } from "../../constants/images";

class Core extends Component {
  render() {
    return (
      <div className={homeStyles.App}>
        <Navogation />
        {/* <div className={homeStyles.Welcome}>
          <div className={homeStyles.AnimateReveal}>
            <h2 className={homeStyles.AnimateFirst}>Welcome To</h2>
            <h1 className={homeStyles.AnimateSecond}>Compie Restuarant.</h1>
          </div>
        </div> */}
        <Routing />
      </div>
    );
  }
}

export default Core;
