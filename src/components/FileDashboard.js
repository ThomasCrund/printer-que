import React from "react";
import save from "../Assets/save.png";
import Classes from "../Style/fileDashboard.module.css";
import upload from "../Assets/upload.png";
import Axios from "axios";
import Dropzone from 'react-dropzone'

class FileDashboard extends React.Component{
    formData = {
        "jobName": "",
        "priority": 1,
        "description": "",
        "settings": {}
    }
    state = {
        "loading": false,
        "selectedFile": null
    }

    onDrop = files => {
        this.setState({ selectedFile: files[0]});
    }

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
                        <div onClick={this.saveJob} className={Classes.buttonTwo}>
                            <img src={save} alt= "save" />
                            <button >Save</button>
                        </div>
                    </div>

                    <div className={Classes.cardGrid}>
                        <div className={Classes.card}>
                            <div>
                                <h2 className={Classes.heading}><input onChange={this.nameChange} placeholder="name" /></h2>
                                <p className={Classes.info}>Priority:   <select onChange={this.priorityChange} name="Priority">
                                                                            <option value={1}>1 - Lowest</option>
                                                                            <option value={2}>2 - Low</option>
                                                                            <option value={3}>3 - Medium</option>
                                                                            <option value={4}>4 - High</option>
                                                                            <option value={5}>5 - Highest</option>
                                                                        </select>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={Classes.first}>
                            <div className={Classes.firstTitle}>
                                <p>Printer Settings</p>
                            </div>
                            <div className={Classes.settingsArea}>
                                Why Should I put settings for you to use
                            </div>
                            <div className={Classes.secondTitle}>
                                <p>Description</p>
                            </div>
                            <div className={Classes.descriptionArea}>
                                <textarea onChange={this.descChange}></textarea>
                            </div>
                            </div>
                        </div>
                        <div>
                            <div className={Classes.sides}>
                                <div className={Classes.side}>
                                    <p>Upload STL</p>
                                </div>
                                <Dropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()} className={Classes.upload}>
                                            <input {...getInputProps()} />
                                            <img src={upload} alt="upload" className={Classes.uploadImage}/>
                                            {this.state.selectedFile ?
                                                <React.Fragment>
                                                    <p className={Classes.or}>{this.state.selectedFile.name}</p> 
                                                </React.Fragment> :
                                                <React.Fragment>
                                                    <p className={Classes.dragText}>Drag and Drop File</p>
                                                    <p className={Classes.or}>or</p>
                                                </React.Fragment>
                                                }
                                            
                                            
                                            <button className={Classes.btnBrowse}>
                                                Browse
                                            </button>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.loading ? 
                    <div>
                        <div style={{
                            position:"absolute",
                            width: "100%",
                            height: "100%",
                            left: "0",
                            top: "0",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 4
                        }}>

                        </div>
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            zIndex: 5
                        }}>
                            <h2>Loading</h2>
                            

                        </div>
                    </div>
                  : null }
            </div>
        );
    }

    nameChange = (e) => {
        this.formData.jobName = e.target.value;
    }

    descChange = (e) => {
        this.formData.description = e.target.value;
    }

    priorityChange = (e) => {
        this.formData.priority = Number(e.target.value);
    }

    uploadFile = async (id) => {
        const formFileData = new FormData();

    
        formFileData.append( 
            "upload", 
            this.state.selectedFile
        ); 

        
        let response = await Axios.post('/api/job/' + id + '/printFile', formFileData, {headers: {'Authorization': this.props.token, 'Content-Type': 'multipart/form-data'}});
        console.log(response)
        return response;
    }

    saveJob = async () => {
        this.setState({loading: true})
        this.props.errorHandle(null)
        let response = await Axios.post('/api/job/new', this.formData, {headers: {'Authorization': this.props.token}});
        console.log(response)
        if (!response.data.success) { this.setState({loading: false}); this.props.errorHandle(response.data.message); return; };
        
        if (this.state.selectedFile) {
            await this.uploadFile(response.data.insertedId)
        }

        //let getResponse = await Axios.get('/api/job/' + response.data.insertedId, {headers: {'Authorization': this.props.token}})
        //console.log(getResponse);

        this.setState({loading: false})
        this.props.history.push("/job/" + response.data.insertedId);
    }
}

export default FileDashboard;