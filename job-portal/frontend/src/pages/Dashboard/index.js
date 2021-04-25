import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import AddJob from "./addJob";
import ShowJob from "./showJob";
// import {
//   showJob,
// } from "../../actions/jobAction";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        currentOption : "addjob",
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
        currentOption === "addjob" ? <AddJob/> : <></>
      }
      {
        currentOption === "showjob" ? <ShowJob/> : <></>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
