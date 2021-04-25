import React from "react";
import { connect } from "react-redux";
import {showAllJob} from "../../actions/jobAction";
import {applyJob} from "../../actions/applicationAction";

class ShowJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.showAllJob();
  }

  handleClickApply = (jobId) => {
    this.props.applyJob(jobId);
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
                  Company Name: {job.companyname}
              </p>
              <p>
                  Description: {job.description}
              </p>
              <p>
                  Skill: {job.skill}
              </p>
              <p>
                  PostedOn: {job.createdon.substr(0,10)}
              </p>
              <p>
                  Active: {job.active}
              </p>
              </p>
          </div>
          <div>
            <button  class="btn blue-gradient" 
            onClick = {() => this.handleClickApply(job.id)}
            >
                Apply</button>
            </div>
          </div>
            );
        })}
      </div>
    );
  }

  render() {
    const {jobData} = this.props;
    // console.log("sadasd",jobData);
    
    return (
      <div>
          <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
              {this.showJobBar(jobData)}
        </div>
      </main>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        showAllJob: () => dispatch(showAllJob()),
        applyJob: (jobId) => dispatch(applyJob(jobId))
    };
  };
  
  const mapStateToProps = (state) => {
    return {
        jobData: state.job.jobData
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowJob);