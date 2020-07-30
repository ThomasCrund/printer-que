import React, { Component } from 'react'

export class ErrorBlock extends Component {
    render() {
        return (
            <div style={{
                width: "100%",
                paddingLeft: "100px",
                marginTop: "20px"
            }}>
                <div style={{
                    backgroundColor: "#ff8282",
                    color: "white",
                    padding: "10px",
                    border: "solid 1px #ff2626",
                    borderRadius: "10px",
                    margin: "0 20px"
                }}>
                   Error: {this.props.message}
                </div>
            </div>
        )
    }
}

export default ErrorBlock
