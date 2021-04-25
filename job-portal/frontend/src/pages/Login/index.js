import React from "react";
import Joi from "@hapi/joi";

import _ from "lodash";
import { connect } from "react-redux";
import { signIn,getOTP } from "../../actions/authAction";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        email : "",
        otp : "",
        companyname: ""
      },
      errors: {},
      userRole : this.props.location.state,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // const { error } = Joi.validate(obj, schema);
    // return error ? error.details[0].message : null;
  };

  // validate = () => {
  //   const options = { abortEarly: false };
  //   const result = Joi.validate(this.state.data, this.schema, options);
  //   if (!result.error) return null;

  //   const errors = {};
  //   result.error.details.forEach(
  //     (element) => (errors[element.path[0]] = element.message)
  //   );
  //   return errors;
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.getOTP(this.state.data.email,"1",this.state.userRole);
  };

  handleVerify = (e) => {
    e.preventDefault();

    if (
      
      this.state.data.email !== "" &&
      this.state.data.companyname !== "" &&
      this.state.data.otp !== ""
    ) 
    {
      
    //   const errors = this.validate();
    // if (_.isEmpty(errors)) 
    this.props.signIn(this.state.data,this.state.userRole);
    }
  };

  handleResend = (e) => {
    e.preventDefault();

    this.props.getOTP(this.state.data.email,"1",this.state.userRole);
  };

  render() {
    const { data, errors } = this.state;
    const { email,otp ,companyname} = data;
    const { authMessage, loggedIn, userData,isVerify,status } = this.props;
    if (loggedIn === true) this.props.history.push("/dashboard");
    if (status) {
      localStorage.setItem("token",userData.token);
      localStorage.setItem("loggedIn", true);
      this.props.history.push("/dashboard",this.state.userRole)
  };
  // console.log(this.state.userRole);
    
    return (
      <div className="">
        <div className=" d-flex h-100 justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">
                <div className="card wow fadeIn" data-wow-delay="0.3s">
                  <div className="card-body">
                    <div className="form-header purple-gradient">
                      <h3 className="font-weight-500 my-2 py-1">
                        <i className="fas fa-user"></i> Log in
                      </h3>
                    </div>

                    <form
                      onSubmit={this.handleSubmit}
                    >
                      <div className="md-form">
                        <i className="fas fa-envelope prefix "></i>
                        <input
                          type="email"
                          name="email"
                          id="orangeForm-email"
                          className="form-control"
                          onChange={this.handleChange}
                          value={email}
                          autoFocus
                        />
                        <label htmlFor="orangeForm-email">Your email</label>
                        {errors["email"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["email"]}{" "}
                          </div>
                        )}
                      </div>

                      <div className="md-form">
                        <i className="fas fa-building prefix "></i>
                        <input
                          type="text"
                          name="companyname"
                          id="orangeForm-company"
                          className="form-control"
                          onChange={this.handleChange}
                          value={companyname}
                          autoFocus
                        />
                        <label htmlFor="orangeForm-email">Your Company Name</label>
                        {errors["companyname"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["companyname"]}{" "}
                          </div>
                        )}
                      </div>

                      {isVerify ? (
                            <div className="md-form">
                              <i className="fas fa-key prefix"></i>
                              <input
                                type="text"
                                name="otp"
                                id="orangeForm-otp"
                                className="form-control"
                                onChange={this.handleChange}
                                value={otp}
                              />
                              <label htmlFor="orangeForm-otp">Enter OTP</label>
                            </div>
                          ) : (
                            ""
                          )}


                      {authMessage ? (
                        <p className="" style = {{color : "blue"}}> {authMessage}</p>
                      ) : (
                        <> </>
                      )}
                      <div className="text-center">
                      {isVerify ? (
                            <div className="row" style={{ display: "flex" }}>
                              <div className="text-center col-6">
                                <button
                                  className="btn  purple-gradient btn-rounded mt-3 btn-lg"
                                  type="button"
                                  onClick={this.handleVerify}
                                >
                                  Verify
                                </button>
                              </div>

                              <div className="text-center col-6">
                                <button
                                  className="btn  purple-gradient btn-rounded mt-3 btn-lg"
                                  type="button"
                                  onClick={this.handleResend}
                                >
                                  Resend
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <button
                                className="btn purple-gradient mt-3 btn-lg"
                                type="button"
                                // disabled={this.validate()}
                                onClick={this.handleSubmit}
                              >
                                Sign up
                              </button>
                            </div>
                          )}

                        <div className=" justify-content-center ">
                        


                          <div className="d-flex flex-row justify-content-center mt-3">
                            <span className="   mt-2  text-info">
                              No Account?
                            </span>
                            <a href="http://localhost:3000/register">
                              {" "}
                              <button
                                type="button"
                                className="btn btn-info btn-rounded btn-sm"
                              >
                                {" "}
                                Register{" "}
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    isVerify: state.auth.isVerify,
    status: state.auth.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds,role) => dispatch(signIn(creds,role)),
    getOTP: (email,type,role) => dispatch(getOTP(email,type,role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
