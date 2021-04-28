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
        localStorage.setItem("userRole","recruiter");
        this.setState({recruiterClicked : true});
        
    }

    handleClickCandidate = () =>{
        localStorage.setItem("userRole","candidate");
        this.setState({candidateClicked : true});
        
    }

    render(){
        if(this.state.recruiterClicked){
            this.props.history.push("/register");
        }
        if(this.state.candidateClicked){
            this.props.history.push("/register");
        }
        return(
           
                <div class="view full-page-intro" 
                style={{
                    "background-image": 
                    "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-g20-summit-simple-business-background-image_232743.jpg')",
                    "background-repeat": "no-repeat",
                    "backgroundSize" : "cover"
                    ,"height":"16.85cm"
                }}
                >
                <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row wow fadeIn">
                    <div class="col-md-12 mb-4 white-text text-center text-md-left ">
                        <h1 class="display-4 font-weight-bold ">JOB FINDER</h1>
                        <p>
                        <h2>Find A Job at India's No. 1 Job Portal.</h2>
                        </p>
                        <p class="mb-4 d-none d-md-block">
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
                            }}
                            onClick={() => this.handleClickRecruiter()}>Recruiter</button>
                        </div>
                        <div>
                            <button  class="btn blue-gradient" 
                            style={{
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