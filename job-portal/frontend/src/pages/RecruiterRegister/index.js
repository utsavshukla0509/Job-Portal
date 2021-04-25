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
        otp: "",
      },
      errors: {},
      authError: "",
    };
    this.handleResend = this.handleResend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    this.props.getOTP(this.state.data.email);
  };

  handleVerify = (e) => {
    e.preventDefault();

    if (
      this.state.data.username !== "" &&
      this.state.data.email !== "" &&
      this.state.data.username !== "" &&
      this.state.data.otp !== ""
    ) {
      const { username, companyname, email,otp} = this.state.data;
      this.props.signUp({ username, email, companyname, otp });
    }
  };

  handleResend = (e) => {
    e.preventDefault();
    this.props.getOTP(this.state.data.email);
  };

  schema = {
    username : Joi.string().alphanum().min(3).max(30),
    email : Joi.string().email({tlds:{allow: false}}).required().label("Email"),
    companyname : Joi.string().min(3).required().label("companyname")
  };

  render() {
    // if (this.props.status === true && this.state.isVerify === false) {
    //   this.setState({ isVerify: true });
    // }
    const { authMessage, status, userData, loggedIn ,isVerify} = this.props;
    const { errors, authError } = this.state;
    const { username, email, companyname, otp} = this.state.data;
    console.log(status);
    if (status) {
        localStorage.setItem("name",userData.token);
        localStorage.setItem("loggedIn", true);
        this.props.history.push("/dashboard")
    };

    return (
      <div>
        <div className="">
          <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="row pt-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-header purple-gradient">
                      <h3 className="font-weight-500 my-2 py-1">
                        <i className="fas fa-user"></i> Register
                      </h3>
                    </div>
                    {/* <h2 className="font-weight-bold my-4 text-center mb-2 mt-2 font-weight-bold">
                        <strong>Register</strong>
                      </h2> */}

                    <div className="">
                      <div className="d-flex flex-row-reverse">
                        <a href="http://localhost:3000/login">
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info btn-rounded btn-sm"
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
    isVerify : state.auth.isVerify
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
    getOTP: (email) => dispatch(getOTP(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
