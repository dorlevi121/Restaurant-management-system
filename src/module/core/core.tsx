import React, {Component} from 'react';
import homeStyles from "./core.module.scss";
import Routing from "../../app.routing";
import Navogation from "./components/navigation";
import { logoImg } from '../../constants/images';

class Core extends Component {
    render() {
        return (
            <div className={homeStyles.App}>
                <ul className={homeStyles.ul}>
                    <div className={homeStyles.Header}>
                        <img src={logoImg} alt="Logo"/>
                    </div>
                    <Navogation/>
                </ul>
                <Routing/>
            </div>
        );
    }
}

export default Core;