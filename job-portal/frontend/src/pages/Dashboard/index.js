import React from "react";
import { connect } from "react-redux";
import RecruiterDashboard from "../RecruiterDashboard";
import CandidateDashboard from "../CandidateDashboard";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        userRole : this.props.location.state,
    };
  }

  componentDidMount(){
  }


  render() {
    if (localStorage.getItem('loggedIn') === "false" || 
      localStorage.getItem('token') === "" || 
    localStorage.getItem('token') === null || 
    localStorage.getItem('token') === undefined) 
    this.props.history.push("/register");
    
    const {userRole} = this.state;
    console.log(userRole);
    
    return (
      <div>
        {userRole === "recruiter" ? <RecruiterDashboard/> : <CandidateDashboard/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
