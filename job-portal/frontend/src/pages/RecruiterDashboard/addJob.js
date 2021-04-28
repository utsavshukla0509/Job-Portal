import React from "react";
import { connect } from "react-redux";
import Joi from "@hapi/joi";
import {
  postJob
} from "../../actions/jobAction";
import "./addJob.css";
class AddJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        jobDetail : {
            description : "",
            skill : "",
        },
        errors : {},
        openAddFrom : false,
    };
    this.handleClickAddJob = this.handleClickAddJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  schema = {
    description : Joi.string().alphanum().max(250).required(),
    skill : Joi.string().max(20).required(),
  };

  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.postJob(this.state.jobDetail);

    const jobDetail = {
      description : "",
            skill : "",
    }

    this.setState({jobDetail : jobDetail});
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // const { error } = Joi.validate(obj, schema);
    // return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {

    const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);

    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    const jobDetail = { ...this.state.jobDetail };
    jobDetail[input.name] = input.value;
    this.setState({ jobDetail, errors });
  };


  handleClickAddJob = () => {
      const currState = this.state.openAddFrom;
    this.setState({openAddFrom : currState === true ? false : true})
  }

  render() {
    const {authMessage} = this.props;
    const {errors} = this.state;
    const {description,skill} = this.state.jobDetail;
    console.log(authMessage);

    return (
      <div>
          <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  {/* <a href="https://mdbootstrap.com/docs/jquery/" target="_blank">Home Page</a>
                        <span>/</span> */}
                  <span>Add Job</span>
                </h4>
                <div style={{
            
              }}>
                <button  class="btn blue-gradient" 
                onClick={this.handleClickAddJob}
                >
                    Add Job</button>
                </div>
            </div>
              
              {
                  this.state.openAddFrom ? 
                  <div style = {{
                      height : '500px',
                      width : '850px',
                      marginTop : '100px',
                      position : 'absolute',

                    }}>

                  <div class="contact-form-card">
                    <div class="w-form">
                      <form id="email-form"  name="email-form" data-name="Email Form" method="get" 
                        class="contact-form"
                        onSubmit={this.handleSubmit}>
                      <div id="w-node-_33f6c3e2-b2d9-83b1-c376-83268f84cde6-d0212c0e">
                          <label >Job Description</label>
                          <textarea
                            id = "1"
                            name="description" 
                            maxlength="5000" 
                            className="input text-area w-input"  
                            onChange={this.handleChange}
                            value={description} 
                            >
      
                          </textarea>
                        </div>
                        <div id="w-node-e3b528c9-c5bb-34d6-a3e1-1b661267df27-d0212c0e">
                          <label for="skill">Skill</label>
                          <input 
                            id="2"
                            name = "skill"
                            type="text" 
                            className="input w-input" 
                            maxlength="256"  
                            value={skill} 
                            onChange={this.handleChange}/>
                        </div>
                        {authMessage ? (
                        <p className="" style = {{color : "blue"}}> {authMessage}</p>
                      ) : (
                        <> </>
                      )}
                        <div className="text-center">
                              <button
                                className="btn blue-gradient mt-3 btn-lg"
                                type="button"
                                style = {{width:'200px'}}
                                // disabled={this.validate()}
                                onClick={this.handleSubmit}
                              >
                                Add
                              </button>
                            </div>
                      </form>
                    </div>
                    </div>
                </div>
                :
                <></>
              }
            </div>
        </div>
      </main>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        postJob: (jobDetail) => dispatch(postJob(jobDetail)),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
        authMessage: state.job.authMessage,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
  

