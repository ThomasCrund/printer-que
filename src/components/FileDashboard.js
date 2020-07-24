import React from "react";
import save from "../Assets/save.png";
import Classes from "../Style/fileDashboard.module.css";
import clock from "../Assets/clock.png";
import upload from "../Assets/upload.png";


class FileDashboard extends React.Component{
    render(){
        return (
            
            <div className={Classes.mainGrid}>
                <div>
                </div>
                <div>
                    <div className={Classes.sectionOne}>
                        <h1>New Job</h1>
                        <div>
                        </div>
                        <div className={Classes.buttonTwo}>
                            <img src={save} alt= "save" />
                            <button>Save Settings</button>
                        </div>
                    </div>

                    <div className={Classes.cardGrid}>
                        <div className={Classes.card}>
                            <img src={clock} alt="clock"/>
                            <div>
                                <h2 className={Classes.heading}>2h 43m</h2>
                                <p className={Classes.info}>Expected wait time</p>
                            </div>
                        </div>
                        <div>
                            <div className={Classes.first}>
                            <div className={Classes.firstTitle}>
                                <p>Printer Settings</p>
                            </div>
                            </div>
                        </div>
                        <div>
                            <div className={Classes.sides}>
                                <div className={Classes.side}>
                                    <p>Upload STL</p>
                                </div>
                                <div className={Classes.upload}>
                                    <img src={upload} alt="upload" className={Classes.uploadImage}/>
                                    <p className={Classes.dragText}>Drag and Drop File</p>
                                    <p className={Classes.or}>or</p>
                                    <button className={Classes.btnBrowse}>Browse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileDashboard;