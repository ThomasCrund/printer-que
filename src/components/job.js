import React, { Component } from 'react';
import Axios from 'axios';

class Job extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {}
        }
    }

    async componentDidMount() {

        console.log(this)
        let response = await Axios.get('/api/job/' + this.props.match.params.id, {headers: {'Authorization': this.props.token}})

        
        if (response.data.success !== false) {
            console.log("success")
            this.setState({
                job: response.data.job
            })
        } else {
            console.log(response);
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>Test</div>
        )
    }

    uploadFile = () => {
        console.log("Upload File");
    }

    updateName = (name) => {
        this.updateJob({
            jobName: name
        })
    }

    updateDescription = (desc) => {
        this.updateJob({
            description: desc
        })
    }

    updateSettings = (settings) => {
        this.updateJob({
            settings: settings
        })
    }

    updatePriority = (priority) => {
        this.updateJob({
            priority: priority
        })
    }

    updateJob = (data) => {
        Axios.put(  '/api/job/' + this.props.match.params.id, 
                    data,
                    { //CONFIG
                        headers: {'Authorization': this.props.token}
                    })
    }
}

export default Job;