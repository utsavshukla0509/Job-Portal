import React from "react";
import { connect } from "react-redux";
import Joi from "@hapi/joi";
import {
  showJob,
} from "../../actions/jobAction";
import {showCandidate} from "../../actions/applicationAction";
class ShowJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        showCandidateList : false,
    };
  }

  componentDidMount() {
    this.props.showJob();
  }

  handleClickShowCandidatesList = (jobId) => {
    this.setState({showCandidateList : true});
    this.props.showCandidate(jobId);
  }

handleCloseCandidateBox = () => {
  this.setState({showCandidateList : false});
}

  showList = (candidateData) => {
    return (

      <div className = "facebox" style={{
          // top: '63.7px',
          // left: '130.5px',
          // width:'100px', 
          position : 'absolute',
          zIndex:"100",
          textAlign:'left',
          borderStyle :'solid',
          // marginLeft:'250px'
        }}>

            <div class = "popup">
                <div class = "content" 
                style={{
                  display: 'table',
                  width: '370px',
                  padding: '10px',
                  background: '#fff',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
                >
                  <a style = {{marginLeft: '770px'}} onClick = {this.handleCloseCandidateBox}>
                    <i className = "fas fa-window-close"></i>
                  </a>

                    <div style = {{display:'flex',justifyContent:'space-between'}}>
                    <h3>Name</h3>
                    <h3>Email</h3>
                    <h3>Resume</h3>
                    <h3>Status</h3>
                    </div>

                    <div className = "sorce-popup" 
                    style = {{
                      width: '750px', 
                      height: '600px', 
                      overflow: 'auto', 
                      padding: '1em', 
                      margin: '1em', 
                      fontSize: '1.2rem', 
                      display: 'block'}}
                    >
                      <div style = {{display:'flex' ,flexDirection:'column'}}>
                        { candidateData !== undefined &&
                          candidateData.map((candidate)=>{
                            return (
                              <div style = {{display:'flex',justifyContent:'space-between'}}>
                                <p>
                                  {candidate.name}
                                </p>
                                <p>
                                    {candidate.email}
                                </p>
                                <p>
                                    <a href={candidate.resume} target="_blank">Resume</a>
                                </p>
                                <p>
                                    {candidate.status}
                                </p>
                              </div>
                            );
                          })
                        }
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
  }


  showJobBar = (jobData) => {
    
    return (
      <div>
        {jobData != undefined && jobData.map((job) => {
          //   console.log(optionName);
          return (
            <div className="card mb-4 wow fadeIn" style = {{display:'flex',flexDirection:'row'}}>
            <div className="card-body d-sm-flex justify-content-between">
            <p className="mb-2 mb-sm-0 pt-1">
              <p>
                  Job Id: {job.id}
              </p>
              <p>
                  Job Description: {job.description}
              </p>
              <p>
                  Skill: {job.skill}
              </p>
              <p>
                  PostedOn: {job.createdon.substr(0,10)}
              </p>
              </p>
          </div>
          <div>
            <button  class="btn blue-gradient" 
            onClick = {() => this.handleClickShowCandidatesList(job.id)}
            >
                Applied Candidates</button>
            </div>
          </div>
            );
        })}
      </div>
    );
  }

  render() {
    const {authMessage,jobData,candidateData} = this.props;
    const {showCandidateList} = this.state;
    console.log(jobData);
    console.log(candidateData);
    return (
      <div>
          <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
              { showCandidateList ? this.showList(candidateData) : <></>}    
              {this.showJobBar(jobData)}
        
        </div>
      </main>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        showJob: () => dispatch(showJob()),
        showCandidate: (jobId) => dispatch(showCandidate(jobId)),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
        candidateData: state.application.candidateData,
        jobData: state.job.jobData
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowJob);