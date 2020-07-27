import React from "react";
import Classes from "../Style/sidebar.module.css";
import chart from "../Assets/chart.png";
import files from "../Assets/files.png";
import folder from "../Assets/folder.png";
import message from "../Assets/message.png";
import shapes from "../Assets/shapes.png";
import setting from "../Assets/setting.png";
import {NavLink} from "react-router-dom";

class Sidebar extends React.Component{
    render(){
        return (
            <div className={Classes.sidebar}>
                <div className={Classes.logo}>
                    {/* <img src="" alt="LOGO"/> */}
                </div>
                <div className={Classes.options}>
                    <NavLink exact to="jobs" activeClassName={Classes.active}>
                        <div className={Classes.images}>
                            <img src={folder} alt="folder" />
                        </div>
                    </NavLink>
                    <NavLink exact to="/" activeClassName={Classes.active}>
                        <div className={Classes.images}>
                            <img src={chart} alt="chart" /> 
                        </div>
                    </NavLink>
                    <NavLink to="message" activeClassName={Classes.active}> 
                        <div className={Classes.images}>
                            <img src={message} alt="message" />
                        </div>
                    </NavLink>
                    <NavLink to="jobs/new" activeClassName={Classes.active}>
                        <div className={Classes.images}>
                            <img src={files} alt="files" />
                        </div>
                    </NavLink>
                    <NavLink to="shapes" activeClassName={Classes.active}> 
                        <div className={Classes.images}>
                            <img src={shapes} alt="shapes" />
                        </div>
                    </NavLink>
                    <div className={Classes.setting}>
                        <img src={setting} alt="setting" />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Sidebar;