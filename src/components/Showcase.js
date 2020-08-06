import React from "react";
import Classes from "../Style/showcase.module.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Showcase extends React.Component{
    state = {
        jobs: []
    }

    async componentDidMount() {
        let response = await Axios.get('/api/job/user', {headers: {'Authorization': this.props.token}})

        this.setState({ jobs: response.data.jobs})
    }
    render(){
        console.log(this.state)
        let jobsList = this.state.jobs.map((job) => {
            let priorityClass;
            if (job.priority === 3 || job.priority === 4) {
                priorityClass = Classes.high;
            } else if (job.priority === 1 || job.priority === 2) {
                priorityClass = Classes.low
            } else {
                priorityClass = Classes.red
            }

            return  (
                <div className={Classes.markGrid} key={job.id}>
                        <p className={Classes.mark}>{job.jobName}</p>
                        <p className={Classes.label +" "+ priorityClass}>{job.priority}</p>
                </div>
            )
        })

        return (
            <React.Fragment>
            <div className={Classes.showcaseGrid}>
                <div className={Classes.first}>
                    <div className={Classes.firstTitle}>
                        <p>Quick STL viewer</p>
                    </div>
                </div>
                <div className={Classes.second}>
                    <div className={Classes.secondTitle}>
                        <p>Your Jobs</p>
                        <NavLink className={Classes.viewAll} to="/jobs" style={{textDecoration: "none"}}> view all</NavLink> 
                    </div>
                    <div className={Classes.scroll}>

                        { jobsList }
                        {/*<div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.red}>urgent</p>
                        </div>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.red}>urgent</p>
                        </div>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.high}>High</p>
                        </div>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.number}>8.1</p>
                        </div>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.number}>7.9</p>
        </div>*/}
                    </div>
                </div>
            </div>
            

            </React.Fragment>
        );
    }
}

export default Showcase;