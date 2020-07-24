import React from "react";
import Classes from "../Style/showcase.module.css";

class Showcase extends React.Component{
    render(){
        return (
            <React.Fragment>
            <div className={Classes.shwocaseGrid}>
                <div className={Classes.first}>
                    <div className={Classes.firstTitle}>
                        <p>Quick STL viewer</p>
                    </div>
                </div>
                <div className={Classes.second}>
                    <div className={Classes.secondTitle}>
                        <p>Times</p>
                        <p className={Classes.viewAll}>view all</p>
                    </div>
                    <div className={Classes.scroll}>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.high}>High</p>
                        </div>
                        <div className={Classes.markGrid}>
                                <p className={Classes.mark}>Lorem ipsum</p>
                                <p className={Classes.label +" "+ Classes.low}>low</p>
                        </div>
                        <div className={Classes.markGrid}>
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
                        </div>
                    </div>
                </div>
            </div>
            

            </React.Fragment>
        );
    }
}

export default Showcase;