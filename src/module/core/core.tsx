import React, { Component } from "react";
import homeStyles from "./core.module.scss";
import Routing from "../../app.routing";
import Navigation from "./components/navigation";

class Core extends Component {
  render() {
    return (
      <div className={homeStyles.App}>
        <Navigation />
        <Routing />
      </div>
    );
  }
}

export default Core;
