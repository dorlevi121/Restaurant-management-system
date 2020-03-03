import React, {Component} from 'react';
import homeStyles from "./core.module.scss";
import logo from "../../assets/logo/logo.png";
import Routing from "../../app.routing";
import Navogation from "./components/navigation";

class Core extends Component {
    render() {
        return (
            <div className={homeStyles.App}>
                <ul className={homeStyles.ul}>
                    <div className={homeStyles.Header}>
                        <img src={logo} alt="Logo"/>
                    </div>
                    <Navogation/>
                </ul>
                <Routing/>
            </div>
        );
    }
}

export default Core;