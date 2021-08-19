import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Input, Card, CardHeader, CardBody, CardFooter, CustomInput } from 'reactstrap';

import FormValidator from './FormValidator.js';

/**
 * Validation flow using controlled components
 *
 * 1- User type on input
 * 2- onChange event trigger validation
 * 3- Validate methods are listed using "data-validate"
 *    attribute. Content must be an array in json format.
 * 4- The validation returns an object with format {[input name]: status}
 *    where status is an array of boolean per each method
 * 5- Methods that requires an argument, read the 'data-param' attribute
 * 6- Similarly, onSubmit event does a bulk validation on all form elements
 */

class FormValidation extends Component {

    state = {
        /* Group each form state in an object.
           Property name MUST match the form name */
        formRegister: {
            email: '',
            password: '',
            password2: '',
            terms: false
        },
        formLogin: {
            email: '',
            password: ''
        },
        formDemo: {
            text: '',
            email: '',
            number: '',
            integer: '',
            alphanum: '',
            url: '',
            password: '',
            password2: '',
            minlength: '',
            maxlength: '',
            length: '',
            minval: '',
            maxval: '',
            list: ''
        }
    }

     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */
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
            <ContentWrapper>
                <div className="content-heading">
                    <div>Form Validation
                        <small>Form validation based on Controlled Components.</small>
                    </div>
                </div>
                { /* START row */ }
                <Row>
                    <Col lg={ 6 }>
                        <form onSubmit={this.onSubmit} name="formRegister" action="">
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Form Register</div>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-group">
                                        <label className="col-form-label">Email Address *</label>
                                        <Input type="email"
                                            name="email"
                                            invalid={this.hasError('formRegister','email','required')||this.hasError('formRegister','email','email')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required", "email"]'
                                            value={this.state.formRegister.email}/>
                                        { this.hasError('formRegister','email','required') && <span className="invalid-feedback">Field is required</span> }
                                        { this.hasError('formRegister','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password *</label>
                                        <Input type="text"
                                            id="id-password"
                                            name="password"
                                            invalid={this.hasError('formRegister','password','required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            value={this.state.formRegister.password}
                                        />
                                        <span className="invalid-feedback">Field is required</span>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Confirm Password *</label>
                                        <Input type="text" name="password2"
                                            invalid={this.hasError('formRegister','password2','equalto')}
                                            onChange={this.validateOnChange}
                                            data-validate='["equalto"]'
                                            value={this.state.formRegister.password2}
                                            data-param="id-password"
                                        />
                                        <span className="invalid-feedback">Field must be equal to previous</span>
                                    </div>
                                    <div className="required">* Required fields</div>
                                </CardBody>
                                <CardFooter>
                                    <div className="d-flex align-items-center">
                                        <CustomInput type="checkbox" id="terms"
                                            name="terms"
                                            label="I agree with the terms"
                                            invalid={this.hasError('formRegister','terms','required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            checked={this.state.formRegister.terms}>
                                                <span className="invalid-feedback">Field is required</span>
                                            </CustomInput>
                                        <div className="ml-auto">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </Col>
                    <Col lg={ 6 }>
                        <form onSubmit={this.onSubmit} method="post" name="formLogin">
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Form Login</div>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-group">
                                        <label className="col-form-label">Email Address *</label>
                                        <Input type="email"
                                            name="email"
                                            invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required", "email"]'
                                            value={this.state.formLogin.email}/>
                                        { this.hasError('formLogin','email','required') && <span className="invalid-feedback">Field is required</span> }
                                        { this.hasError('formLogin','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password *</label>
                                        <Input type="text"
                                            id="id-password"
                                            name="password"
                                            invalid={this.hasError('formLogin','password','required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            value={this.state.formLogin.password}
                                        />
                                        <span className="invalid-feedback">Field is required</span>
                                    </div>
                                    <div className="required">* Required fields</div>
                                </CardBody>
                                <CardFooter>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </Col>
                </Row>
                { /* END row */ }
                { /* START row */ }
                <Row>
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit} action="" name="formDemo">
                            { /* START card */ }
                            <Card className="card-default">
                                <CardHeader>
                                    <div className="card-title">Fields validation</div>
                                </CardHeader>
                                <CardBody>
                                    <legend className="mb-4">Type validation</legend>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Required Text</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="text"
                                                    invalid={this.hasError('formDemo','text','required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.formDemo.text}
                                                />
                                                <span className="invalid-feedback">Field is required</span>
                                            </Col>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Email</label>
                                            <Col md={ 6 }>
                                                <Input type="email"
                                                    name="email"
                                                    invalid={this.hasError('formDemo','email','required')||this.hasError('formDemo','email','email')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required", "email"]'
                                                    value={this.state.formDemo.email}/>
                                                { this.hasError('formDemo','email','required') && <span className="invalid-feedback">Field is required</span> }
                                                { this.hasError('formDemo','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                            </Col>
                                            <Col md={ 4 }></Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Number</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="number"
                                                    invalid={this.hasError('formDemo','number','number')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["number"]'
                                                    value={this.state.formDemo.number}/>
                                                <span className="invalid-feedback">Field must be valid number</span>
                                            </Col>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Integer</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="integer"
                                                    invalid={this.hasError('formDemo','integer','integer')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["integer"]'
                                                    value={this.state.formDemo.integer}/>
                                                <span className="invalid-feedback">Field must be an integer</span>
                                            </Col>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Alphanum</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="alphanum"
                                                    invalid={this.hasError('formDemo','alphanum','alphanum')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["alphanum"]'
                                                    value={this.state.formDemo.alphanum}/>
                                                <span className="invalid-feedback">Field must be alpha numeric</span>
                                            </Col>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Url</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="url"
                                                    invalid={this.hasError('formDemo','url','url')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["url"]'
                                                    value={this.state.formDemo.url}/>
                                                <span className="invalid-feedback">Field must be valid url</span>
                                            </Col>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Equal to</label>
                                            <div className="col-sm-3">
                                                <Input type="text"
                                                    id="id-source"
                                                    name="password"
                                                    invalid={this.hasError('formDemo','password','required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.formDemo.password}
                                                />
                                                <span className="invalid-feedback">Field is required</span>
                                            </div>
                                            <div className="col-sm-3">
                                                <Input type="text" name="password2"
                                                    invalid={this.hasError('formDemo','password2','equalto')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["equalto"]'
                                                    value={this.state.formDemo.password2}
                                                    data-param="id-source"
                                                />
                                                <span className="invalid-feedback">Field must be equal to previous</span>
                                            </div>
                                            <Col md={ 4 }>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <legend className="mb-4">Range validation</legend>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Minlength</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="minlength"
                                                    invalid={this.hasError('formDemo','minlength','minlen')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["minlen"]'
                                                    value={this.state.formDemo.minlength}
                                                    data-param="6"
                                                />
                                                <span className="invalid-feedback">Field must have a valid length</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Min length of 6</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Maxlength</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="maxlength"
                                                    invalid={this.hasError('formDemo','maxlength','maxlen')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["maxlen"]'
                                                    value={this.state.formDemo.maxlength}
                                                    data-param="10"
                                                />
                                                <span className="invalid-feedback">Field must have a valid length</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Max length of 10</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Length</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="length"
                                                    invalid={this.hasError('formDemo','length','len')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["len"]'
                                                    value={this.state.formDemo.length}
                                                    data-param="[6, 10]"
                                                />
                                                <span className="invalid-feedback">Field must have a valid length</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Length between 6 and 10</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Min</label>
                                            <Col md={ 6 }>
                                                <Input type="number"
                                                    name="minval"
                                                    invalid={this.hasError('formDemo','minval','min')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["min"]'
                                                    value={this.state.formDemo.minval}
                                                    data-param="6"
                                                />
                                                <span className="invalid-feedback">Field must have a minimun value</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Min value 6</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">Max</label>
                                            <Col md={ 6 }>
                                                <Input type="number"
                                                    name="maxval"
                                                    invalid={this.hasError('formDemo','maxval','max')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["max"]'
                                                    value={this.state.formDemo.maxval}
                                                    data-param="6"
                                                />
                                                <span className="invalid-feedback">Field must have a maximun value</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Max value 6</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-2 col-form-label">List</label>
                                            <Col md={ 6 }>
                                                <Input type="text"
                                                    name="list"
                                                    invalid={this.hasError('formDemo','list','list')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["list"]'
                                                    value={this.state.formDemo.list}
                                                    data-param='["red", "pink", "black"]'
                                                />
                                                <span className="invalid-feedback">Field content not allowed</span>
                                            </Col>
                                            <Col md={ 4 }>
                                                <code>Only allowed ["red", "pink", "black"]</code>
                                            </Col>
                                        </div>
                                    </fieldset>
                                </CardBody>
                                <CardFooter className="text-center">
                                    <button type="submit" className="btn btn-info">Run validation</button>
                                </CardFooter>
                            </Card>
                            { /* END card */ }
                        </form>
                    </div>
                </Row>
                { /* END row */ }
            </ContentWrapper>
            );
    }

}

export default FormValidation;

