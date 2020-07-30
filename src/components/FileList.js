import React, {Component} from 'react';
import Classes from "../Style/FileList.module.css";
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import ClassesDash from "../Style/dashboard.module.css";
import Plus from "../Assets/plus.png";

class FileList extends Component {

    constructor(props) {
        super(props)


        this.state = {
            jobs: []
        }
    }
    async componentDidMount() {
        let jobsRequest = await Axios.get('/api/job/', {headers: {'Authorization': this.props.token}})

        console.log(jobsRequest);

        this.setState({
            jobs: jobsRequest.data.jobs
        });
    }

    render() {

        let tableRows = this.state.jobs.map((job) => 
            
                <tr key={job.id}>
                    <td><NavLink to={"jobs/" + job.id}  className={Classes.link}>{job.id}</NavLink></td>
                    <td><NavLink to={"jobs/" + job.id}  className={Classes.link}>{job.jobName}</NavLink></td>
                    <td style={{width:"150px"}}><NavLink to={"jobs/" + job.id}  className={Classes.link}>{job.priority}</NavLink></td>
                    <td><NavLink to={"jobs/" + job.id}  className={Classes.link}>{job.description}</NavLink></td>
                    <td><NavLink to={"jobs/" + job.id}  className={Classes.link}>{job.userName}</NavLink></td>
                </tr>
        )
        return (
            <div className={Classes.page}>
                <div className={Classes.sectionOne}>
                        <h1>Jobs</h1>
                        <NavLink to="jobs/new" className={ClassesDash.link}>
                            <div className={ClassesDash.buttonTwo}>
                                <img src={Plus} alt= "create new job" />
                                <button>Create New job</button>
                            </div>
                        </NavLink>
                    </div>
                <div className={Classes.card}>
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Priority</td>
                                <td>Description</td>
                                <td>User</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FileList;