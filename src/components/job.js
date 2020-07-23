import React, { Component } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

class Job extends Component {
    async componentDidMount() {
        let { id } = useParams();

        let response = await Axios.get('/api/job/' + id, {headers: {'Authorization': this.props.token}})

        console.log(response);
    }

    render() {
        return (
            <div>Test</div>
        )
    }
}

export default Job;