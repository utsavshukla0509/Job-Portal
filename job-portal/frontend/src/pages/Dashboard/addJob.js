import React from "react";
import { connect } from "react-redux";
import Joi from "@hapi/joi";
import {
  postJob
} from "../../actions/jobAction";

class AddJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        jobDetail : {
            description : "",
            skill : "",
            companyname : ""
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
    companyname : Joi.string().max(20).required(),
  };

  handleSubmit = (e) => {
    // e.preventDefault();

    const jobDetail = {
      description : "",
            skill : "",
            companyname : ""
    }

    this.setState({jobDetail : jobDetail,openAddFrom : false});

    this.props.postJob(this.state.jobDetail);
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
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

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
    const {description,skill,companyname} = this.state.jobDetail;
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
                
          {authMessage ? (
            <p className="" style = {{color: "blue"}}> {authMessage}</p>
          ) : (
            <> </>
          )}

              {
                  this.state.openAddFrom ? 
                  <div style = {{
                      height : '500px',
                      width : '850px',
                      marginTop : '100px',
                      position : 'absolute',

                    }}>
                  
                  <div className="row pt-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                      <div >
                        <form onSubmit={this.handleSubmit}>
                          <div className="md-form">
                          <p>Description</p>
                            <input
                              type="text"
                              name="description"
                              id="orangeForm-description"
                              className="form-control"
                              error={errors["description"]}
                              onChange={this.handleChange}
                              value={description}
                            />
                            
                            {errors["description"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["description"]}{" "}
                              </div>
                            )}
                          </div>

                          
                          <div className="md-form">
                          <p>Skill</p>                      
                            <input
                              name="skill"
                              id="orangeForm-skill"
                              className="form-control"
                              type="text"
                              error={errors["skill"]}
                              onChange={this.handleChange}
                              value = {skill}
                            />
                            {errors["skill"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["skill"]}{" "}
                              </div>
                            )}
                          </div>
                          <div className="md-form">
                          <p>Company Name</p>                      
                            <input
                              name="companyname"
                              id="orangeForm-companyname"
                              className="form-control"
                              type="text"
                              error={errors["companyname"]}
                              onChange={this.handleChange}
                              value = {companyname}
                            />
                            {errors["companyname"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["companyname"]}{" "}
                              </div>
                            )}
                          </div>

                          <div className="text-center">
                              <button
                                className="btn blue-gradient mt-3 btn-lg"
                                type="button"
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
        authMessage: state.auth.authMessage,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
  

