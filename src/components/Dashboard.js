import React from "react";
import Cards from "./Cards";
import Showcase from "./Showcase";
import Classes from "../Style/dashboard.module.css";
import Edit from "../Assets/edit.png";
import Plus from "../Assets/plus.png";
import { NavLink } from "react-router-dom";



class Dashboard extends React.Component{
    render(){
        return (
            
            <div className={Classes.mainGrid}>
                <div>
                </div>
                <div>
                    <div className={Classes.sectionOne}>
                        <h1>Dashboard</h1>
                        <div className={Classes.buttonOne}>
                            <img src={Edit} alt= "edit" />
                            <button>Edit job</button>
                        </div>
                        <NavLink to="jobs/new" className={Classes.link}>
                            <div className={Classes.buttonTwo}>
                                <img src={Plus} alt= "create new job" />
                                <button>Create New job</button>
                            </div>
                        </NavLink>
                    </div>

                    <Cards />
                    <Showcase />

                </div>
            </div>
        );
    }
}

export default Dashboard;