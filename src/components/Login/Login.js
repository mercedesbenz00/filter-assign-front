import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input, CustomInput } from 'reactstrap';
import { bindActionCreators } from 'redux';
import FormValidator from '../Forms/FormValidator.js';
import * as actions from '../../store/actions/actions';
import connect from 'react-redux/es/connect/connect';

class Login extends Component {

    state = {
        formLogin: {
            email: '',
            password: ''
        },

        isLoading: false
    }

    constructor(props) {
        super(props);

        this.props.history.entries = [];
        this.props.history.index = -1;
    }
    
    componentDidMount() {
        this.props.actions.changeSetting('isCollapsed', true);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.err !== this.props.err) {
            console.log('error receiving', this.props.err)
            this.setState({
                isLoading: false
            })
        } else if (this.props.loginStatus == true) {
            console.log("Login=", this.props.loginStatus)
            this.props.history.push('/dashboard');
            this.setState({
                isLoading: true
            })

        }
    }
    /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
    **/
    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                [input.name]: value,
                errors: {
                    ...this.state[form.name].errors,
                    [input.name]: result
                }
            }
        });

    }

    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

        e.preventDefault()

        if(!hasError) {
            this.props.actions.login(this.state.formLogin.email, this.state.formLogin.password);
            this.setState({
                isLoading: true
            })
        }
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }

    render() {
        return (
            <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                    
                    <div className="card-body">
                        <p className="text-center py-3"><b>WELCOME</b></p>
                        <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        className="border-right-0"
                                        placeholder="Enter email"
                                        invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={this.state.formLogin.email}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>
                                    { this.hasError('formLogin','email','required') && <span className="invalid-feedback">Field is required</span> }
                                    { this.hasError('formLogin','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Password"
                                        invalid={this.hasError('formLogin','password','required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formLogin.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>
                            </div>
                            <div className="clearfix">
                                <CustomInput type="checkbox" id="rememberme"
                                    className="float-left mt-0"
                                    name="remember"
                                    label="Remember Me">
                                </CustomInput>
                                <div className="float-right">
                                    <Link to="recover" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2021</span>
                    <span className="mx-2">-</span>
                    <span>React Admin</span>
                    <br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ err: auth.err, loginStatus:auth.loginStatus})
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));

