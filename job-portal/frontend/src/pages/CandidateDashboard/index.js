import React from "react";
import { connect } from "react-redux";
import Header from "./header";
// import Footer from "./footer";
import AppliedJob from "./appliedJob";
import ShowJob from "./showJob";
// import {
//   showJob,
// } from "../../actions/jobAction";

class CandidateDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        currentOption : "showjob",
        userRole : localStorage.getItem("userRole"),
    };

    this.handleOption = this.handleOption.bind(this);
  }

  componentDidMount(){
  }


  handleOption = (option) => {
    this.setState({ currentOption : option});
  }

  render() {
    // console.log(localStorage.getItem('name'));

    const userRole = localStorage.getItem("userRole");
    if(userRole == "candidate" || userRole == "recruiter"){
      
    }
    else{
      this.props.history.push("/");
    }

    if (localStorage.getItem('loggedIn') === "false" || 
      localStorage.getItem('token') === "" || 
    localStorage.getItem('token') === null || 
    localStorage.getItem('token') === undefined) 
    this.props.history.push("/register");
    const {currentOption} = this.state;
    
    return (
      <div>
        <Header 
        active={currentOption}
        onOption = {(option) => this.handleOption(option)}
        />

      {
        currentOption === "showjob" ? <ShowJob/> : <></>
      }
      {
        currentOption === "appliedjob" ? <AppliedJob/> : <></>
      }
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDashboard);
