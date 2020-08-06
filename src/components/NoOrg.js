import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Axios from 'axios';

class NoOrg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "domainAvailable": false,
            "domainName": "",
            "inOrg": false,
        }
    }

    componentDidMount() {
        this.getData();
    }
    
    getData = async () => {
        let domainOrg = await Axios.get('/api/org/domain', {headers: {'Authorization': this.props.token}});
        console.log(domainOrg)
        this.setState({ 
            domainAvailable: domainOrg.data.orgAvailable,
            domainName: domainOrg.data.name
        })
    }

    render() {
        console.log(this.state)
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginLeft: "100px"
            }}>
                <div style={{ display:"grid", justifyItems:"center" }}>
                    {this.props.orgPass || this.state.inOrg ? <Redirect to="/"></Redirect> : null} 

                    {this.state.domainAvailable ? 
                    <div style={{ display:"grid", justifyItems:"center" }}>
                        <h4>Organisation available to join</h4>
                        <h3>{this.state.domainName}</h3>
                        <button onClick={this.joinDomain}>Join {this.state.domainName}</button>
                    </div> : null}
                    
                </div>
            </div>
        )
    }

    joinDomain = async () => {
        let response = await Axios.post('/api/org/join', { domain: true }, {headers: {'Authorization': this.props.token}})
        console.log(response)
        if (response.data.success) {
            this.props.propsPass.joinUpdate()
            this.setState({inOrg: true})
        }
    }
}

export default NoOrg
