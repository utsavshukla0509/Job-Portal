import React from "react";
import { connect } from "react-redux";
import {showAppliedJob} from "../../actions/applicationAction";

class AppliedJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.showAppliedJob();
  }


  showJobBar = (candidateData) => {
    
    return (
      <div>
        {candidateData != undefined && candidateData.map((job) => {
          //   console.log(optionName);
          return (
            <div className="card mb-4 wow fadeIn" style = {{display:'flex',flexDirection:'row'}}>
            <div className="card-body d-sm-flex justify-content-between">
            <p className="mb-2 mb-sm-0 pt-1">
              <p>
                  Job Id: {job.jobid}
              </p>
              <p>
                  Company Name: {job.companyname}
              </p>
              <p>
                  Skill: {job.skill}
              </p>
              <p>
                  Status: {job.status}
              </p>
              <p>
                  Active: {job.active}
              </p>
              </p>
          </div>
          {/* <div>
            <button  class="btn blue-gradient" 
            onClick = {() => this.handleClickShowCandidatesList(job.id)}
            >
                Applied Candidates</button>
            </div> */}
          </div>
            );
        })}
      </div>
    );
  }

  render() {
    const {candidateData} = this.props;
    console.log("sadasd",candidateData);
    
    return (
      <div>
          <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
              {this.showJobBar(candidateData)}
        </div>
      </main>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        showAppliedJob: () => dispatch(showAppliedJob()),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
        candidateData: state.application.candidateData
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppliedJob);