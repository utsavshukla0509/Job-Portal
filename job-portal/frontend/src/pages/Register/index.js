import React from "react";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { getOTP, signUp } from "../../actions/authAction";

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        username: "",
        email: "",
        companyname: "",
        resume : "",
        otp: "",

      },
      userRole : localStorage.getItem("userRole"),
      errors: {},
      authError: "",
    };
    this.handleResend = this.handleResend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    // this.setState({userRole : localStorage.getItem("userRole")});
  }

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

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

//   validate = () => {
//     const options = { abortEarly: false };
    
//     if(this.state.data.email == ""){return {};}
//     const result = Joi.validate(this.state.data, this.schema, options);
//     if (!result.error) return null;

//     const errors = {};
//     result.error.details.forEach(
//       (element) => (errors[element.path[0]] = element.message)
//     );

//     return errors;
//   };
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.getOTP(this.state.data.email,"0",this.state.userRole);
  };

  handleVerify = (e) => {
    e.preventDefault();

    if (
      this.state.data.username !== "" &&
      this.state.data.email !== "" &&
      this.state.data.otp !== ""
    ) 
    {
      
      this.props.signUp(this.state.data,this.state.userRole);
    }
  };

  handleOnChangeToLogin = () => {
    this.props.history.push("/login",this.state.userRole);
  }

  handleResend = (e) => {
    e.preventDefault();

    this.props.getOTP(this.state.data.email,"0",this.state.userRole);
  };

  schema = {
    username : Joi.string().alphanum().min(3).max(30),
    email : Joi.string().email({tlds:{allow: false}}).required().label("Email"),
    companyname : Joi.string().min(3).required().label("companyname")
  };

  render() {
    const userRole = this.state.userRole;
    console.log(typeof userRole);
    if(userRole == "candidate" || userRole == "recruiter"){
      
    }
    else{
      this.props.history.push("/");
    }

    const { authMessage, status, userData, loggedIn ,isVerify} = this.props;
    if(loggedIn === true){this.props.history.push("/dashboard");}
    const { errors, authError } = this.state;
    const { username, email, companyname, otp,resume} = this.state.data;
    // console.log("helllllll",this.state.userRole);
    
    if (status) {
        localStorage.setItem("token",userData.token);
        localStorage.setItem("loggedIn", true);
        this.props.history.push("/dashboard",this.state.userRole)
    };

    return (
      <div>
        <div className="">
          <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="row pt-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-header blue-gradient">
                      <h3 className="font-weight-500 my-2 py-1">
                        <i className="fas fa-user"></i> Register
                      </h3>
                    </div>
                    {/* <h2 className="font-weight-bold my-4 text-center mb-2 mt-2 font-weight-bold">
                        <strong>Register</strong>
                      </h2> */}

                    <div className="">
                      <div className="d-flex flex-row-reverse">
                        <a >
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info btn-rounded btn-sm"
                            onClick = {this.handleOnChangeToLogin}
                          >
                            LogIn
                          </button>
                        </a>
                        <span className=" text-right mt-2 text-info">
                          Already SignUp?
                        </span>
                      </div>

                      <div >
                        <form
                          onSubmit={this.handleSubmit}

                        >
                          <div className="md-form">
                            <i className="fas fa-user prefix"></i>
                            <input
                              type="text"
                              name="username"
                              id="orangeForm-name"
                              className="form-control"
                              error={errors["username"]}
                              onChange={this.handleChange}
                              value={username}
                            />
                            <label htmlFor="orangeForm-name">Your Name</label>
                            {errors["username"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["username"]}{" "}
                              </div>
                            )}
                          </div>
                          <div className="md-form">
                            <i className="fas fa-envelope prefix"></i>
                            <input
                              name="email"
                              id="orangeForm-email"
                              className="form-control"
                              type="email"
                              error={errors["email"]}
                              onChange={this.handleChange}
                              value={email}
                            />
                            <label htmlFor="orangeForm-email">Your Email</label>
                            {errors["email"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["email"]}{" "}
                              </div>
                            )}
                          </div>
                            {
                              this.state.userRole === "recruiter"
                              ?
                          <div className="md-form">
                            <i className="fas fa-building prefix"></i>
                            <input
                              name="companyname"
                              id="orangeForm-coname"
                              className="form-control"
                              type="text"
                              onChange={this.handleChange}
                              value={companyname}
                            />
                            <label htmlFor="orangeForm-pass">Your Company Name</label>
                            {errors["companyname"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["companyname"]}{" "}
                              </div>
                            )}
                          </div>

                          :
                          <div className="md-form">
                            <i className="fas fa-file prefix"></i>
                            <input
                              name="resume"
                              id="orangeForm-resume"
                              className="form-control"
                              type="text"
                              onChange={this.handleChange}
                              value={resume}
                            />
                            <label htmlFor="orangeForm-resume">Resume(google drive link)</label>
                            {errors["resume"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["resume"]}{" "}
                              </div>
                            )}
                          </div>
                          }

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
                            <p className="" style = {{color: "blue"}}> {authMessage}</p>
                          ) : (
                            <> </>
                          )}
                          {isVerify ? (
                            <div className="row" style={{ display: "flex" }}>
                              <div className="text-center col-6">
                                <button
                                  className="btn  blue-gradient btn-rounded mt-3 btn-lg"
                                  type="button"
                                  onClick={this.handleVerify}
                                >
                                  Verify
                                </button>
                              </div>

                              <div className="text-center col-6">
                                <button
                                  className="btn  blue-gradient btn-rounded mt-3 btn-lg"
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
                                className="btn blue-gradient mt-3 btn-lg"
                                type="button"
                                // disabled={this.validate()}
                                onClick={this.handleSubmit}
                              >
                                Sign up
                              </button>
                            </div>
                          )}
                        </form>
                      </div>

                      <div
                        style={{
                          width: "154px",
                          height: "1px",
                          marginLeft: "256px",
                        }}
                      />
                    </div>
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
    userData: state.auth.userData,
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
    status: state.auth.status,
    isVerify : state.auth.isVerify,
    userRole: state.auth.userRole
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds,role) => dispatch(signUp(creds,role)),
    getOTP: (email,type,role) => dispatch(getOTP(email,type,role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
