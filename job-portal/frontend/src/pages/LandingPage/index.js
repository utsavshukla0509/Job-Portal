import React from "react";


class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recruiterClicked : false,
            candidateClicked : false,
        };
        this.handleClickRecruiter = this.handleClickRecruiter.bind(this);
        this.handleClickCandidate = this.handleClickCandidate.bind(this);
    }
    
    handleClickRecruiter = () =>{
        this.setState({recruiterClicked : true});
    }

    handleClickCandidate = () =>{
        this.setState({candidateClicked : true});
    }

    render(){
        if(this.state.recruiterClicked){this.props.history.push("/register");}
        if(this.state.candidateClicked){this.props.history.push("/register/candidate");}
        return(
           
                <div class="view full-page-intro" style={{
                    "background-image": 
                    "url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                    ,"height":"17.7cm"
                }}>
                <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row wow fadeIn">
                    <div class="col-md-12 mb-4 white-text text-center text-md-left ">
                        <h1 class="display-4 font-weight-bold ">JOB FINDER</h1>
                        <p>
                        <h2>Find A Job at India's No. 1 Job Portal.</h2>
                        </p>
                        <p class="mb-4 d-none d-md-block">
                        {/* <strong>The most comprehensive tool for managing your Images, simplifying the task to sort through your Image Data.</strong> */}
                        </p>
                    </div>
                    <div
                    style={{
                        "display": "flex",
                        "position": "relative",
                        "left": "850px",
                        "bottom": "350px"
                    }}
                    >
                        <div>
                            <button  class="btn blue-gradient" 
                            style={{
                                // "margin-left": "500px",
                            }}
                            onClick={this.handleClickRecruiter}>Recruiter</button>
                        </div>
                        <div>
                            <button  class="btn blue-gradient" 
                            style={{
                                // "margin-left": "500px",
                            }}
                            onClick={this.handleClickCandidate}>Candidate</button>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-5 mb-4">
                    </div>
                    </div>
                </div>
                </div>
               
            
            </div>
        );
    }
}

export default LandingPage;