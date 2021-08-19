import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Form,
    CustomInput
} from 'reactstrap';
import classnames from 'classnames';

import FormValidator from './FormValidator.js';

const stepNavitemStyle = {
    backgroundColor: '#fcfcfc'
};

class FormWizardValidation extends Component {
    state = {
        activeStep: '1',

        /* Group each form state in an object.
           Property name MUST match the form name */
        formWizard: {
            email: '',
            userName: '',
            password: '',
            password2: '',
            confirm: '',
            fname: '',
            surname: '',
            address: '',
            terms: false
        }
    };

    toggleStep = activeStep => () => {
        // For submit we can obtain the form from the event
        // but for each step we need a global ref to the element
        const form = this.formWizardRef;
        // To validate only the inputs in the current steps, we use an id to query the tabPane
        // and then find all form elements for the current step only.
        const tabPane = document.getElementById('tabPane' + this.state.activeStep);
        const inputs = [].slice.call(tabPane.querySelectorAll('input,select'));
        // Run validation of inputs
        const { errors, hasError } = FormValidator.bulkValidate(inputs);

        // Update state so the validation message are shown/hidden
        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        // and prevent change the if form is not valid
        if (!hasError) {
            if (this.state.activeStep !== activeStep) {
                this.setState({
                    activeStep
                });
            }
        }
    };

    /**
     * Validate input using onChange event
     * @param  {String} formName The name of the form in the state object
     * @return {Function} a function used for the event
     */
    validateOnChange = event => {
        const input = event.target;
        const form = input.form;
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
    };

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return (
            this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
        );
    };

    handleInputChange = event => {
        const target = event.currentTarget;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName));

        const { errors, hasError } = FormValidator.bulkValidate(inputs);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!');

        e.preventDefault();
    };

    // Keep a reference to the form to access from the steps methods
    formRef = node => (this.formWizardRef = node);

    render() {
        return (
            <Form innerRef={this.formRef} name="formWizard" onSubmit={this.handleSubmit}>
                <Card className="card-default">
                    <CardHeader>Basic Form (with Validation)</CardHeader>
                    <CardBody>
                        <Nav pills justified={true}>
                            <NavItem style={stepNavitemStyle}>
                                <NavLink
                                    tag="div"
                                    className={classnames({
                                        active: this.state.activeStep === '1'
                                    })}
                                    onClick={this.toggleStep('1')}
                                >
                                    <h4 className="text-left my-3">
                                        1. Account
                                        <br />
                                        <small>Nam egestas, leo eu gravida tincidunt</small>
                                    </h4>
                                </NavLink>
                            </NavItem>
                            <NavItem style={stepNavitemStyle}>
                                <NavLink
                                    tag="div"
                                    className={classnames({
                                        active: this.state.activeStep === '2'
                                    })}
                                    onClick={this.toggleStep('2')}
                                >
                                    <h4 className="text-left my-3">
                                        2. Profile
                                        <br />
                                        <small>Nam egestas, leo eu gravida tincidunt</small>
                                    </h4>
                                </NavLink>
                            </NavItem>
                            <NavItem style={stepNavitemStyle}>
                                <NavLink
                                    tag="div"
                                    className={classnames({
                                        active: this.state.activeStep === '3'
                                    })}
                                    onClick={this.toggleStep('3')}
                                >
                                    <h4 className="text-left my-3">
                                        3. Hints
                                        <br />
                                        <small>Nam egestas, leo eu gravida tincidunt</small>
                                    </h4>
                                </NavLink>
                            </NavItem>
                            <NavItem style={stepNavitemStyle}>
                                <NavLink
                                    tag="div"
                                    className={classnames({
                                        active: this.state.activeStep === '4'
                                    })}
                                    onClick={this.toggleStep('4')}
                                >
                                    <h4 className="text-left my-3">
                                        4. Finish
                                        <br />
                                        <small>Nam egestas, leo eu gravida tincidunt</small>
                                    </h4>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </CardBody>
                    <TabContent activeTab={this.state.activeStep}>
                        <TabPane id="tabPane1" tabId="1">
                            <div className="pt-3 mb-3">
                                <fieldset>
                                    <label htmlFor="userName">User name *</label>
                                    <Input
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        onChange={this.validateOnChange}
                                        invalid={this.hasError(
                                            'formWizard',
                                            'userName',
                                            'required'
                                        )}
                                        value={this.state.formWizard.userName}
                                        data-validate='["required"]'
                                    />
                                    <span className="invalid-feedback">Field is required</span>
                                    <label htmlFor="password">Password *</label>
                                    <Input
                                        type="text"
                                        id="password"
                                        name="password"
                                        invalid={this.hasError(
                                            'formWizard',
                                            'password',
                                            'required'
                                        )}
                                        onChange={this.validateOnChange}
                                        value={this.state.formWizard.password}
                                        data-validate='["required"]'
                                    />
                                    <span className="invalid-feedback">Field is required</span>
                                    <label htmlFor="password2">Confirm Password *</label>
                                    <Input
                                        type="text"
                                        id="password2"
                                        name="password2"
                                        invalid={this.hasError(
                                            'formWizard',
                                            'password2',
                                            'equalto'
                                        )}
                                        onChange={this.validateOnChange}
                                        data-validate='["equalto"]'
                                        data-param="password"
                                        value={this.state.formWizard.password2}
                                    />
                                    <span className="invalid-feedback">
                                        Field must be equal to previous
                                    </span>
                                    <p>(*) Mandatory</p>
                                </fieldset>
                            </div>
                            <hr />
                            <div className="d-flex">
                                {/*<Button color="secondary">Previous</Button>*/}
                                <Button
                                    className="ml-auto"
                                    color="primary"
                                    onClick={this.toggleStep('2')}
                                >
                                    Next
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane id="tabPane2" tabId="2">
                            <div className="pt-3 mb-3">
                                <fieldset>
                                    <label htmlFor="fname">First name *</label>
                                    <Input
                                        id="fname"
                                        onChange={this.validateOnChange}
                                        invalid={this.hasError('formWizard', 'fname', 'required')}
                                        value={this.state.formWizard.fname}
                                        name="fname"
                                        type="text"
                                        data-validate='["required"]'
                                    />
                                    <span className="invalid-feedback">Field is required</span>
                                    <label htmlFor="surname">Last name *</label>
                                    <Input
                                        id="surname"
                                        onChange={this.validateOnChange}
                                        value={this.state.surname}
                                        invalid={this.hasError('formWizard', 'surname', 'required')}
                                        name="surname"
                                        type="text"
                                        data-validate='["required"]'
                                    />
                                    <span className="invalid-feedback">Field is required</span>
                                    <label htmlFor="email">Email *</label>
                                    <Input
                                        id="email"
                                        onChange={this.validateOnChange}
                                        value={this.state.email}
                                        name="email"
                                        type="text"
                                        invalid={
                                            this.hasError('formWizard', 'email', 'required') ||
                                            this.hasError('formWizard', 'email', 'email')
                                        }
                                        data-validate='["required", "email"]'
                                        className="required email"
                                    />
                                    {this.hasError('formWizard', 'email', 'required') && (
                                        <span className="invalid-feedback">Field is required</span>
                                    )}
                                    {this.hasError('formWizard', 'email', 'email') && (
                                        <span className="invalid-feedback">
                                            Field must be valid email
                                        </span>
                                    )}
                                    <label htmlFor="address">Address</label>
                                    <Input
                                        id="address"
                                        onChange={this.validateOnChange}
                                        value={this.state.address}
                                        name="address"
                                        type="text"
                                    />
                                    <p>(*) Mandatory</p>
                                </fieldset>
                            </div>
                            <hr />
                            <div className="d-flex">
                                <Button color="secondary" onClick={this.toggleStep('1')}>
                                    Previous
                                </Button>
                                <Button
                                    className="ml-auto"
                                    color="primary"
                                    onClick={this.toggleStep('3')}
                                >
                                    Next
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane id="tabPane3" tabId="3">
                            <div className="pt-3 mb-3">
                                <fieldset>
                                    <p className="lead text-center">Almost there!</p>
                                </fieldset>
                            </div>
                            <hr />
                            <div className="d-flex">
                                <Button color="secondary" onClick={this.toggleStep('2')}>
                                    Previous
                                </Button>
                                <Button
                                    className="ml-auto"
                                    color="primary"
                                    onClick={this.toggleStep('4')}
                                >
                                    Next
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane id="tabPane4" tabId="4">
                            <div className="pt-3 mb-3">
                                <fieldset>
                                    <p className="lead">One last check</p>
                                    <CustomInput
                                        type="checkbox"
                                        id="terms"
                                        name="terms"
                                        label="I agree with the terms and conditions"
                                        invalid={this.hasError('formWizard', 'terms', 'required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        checked={this.state.formWizard.terms}
                                    >
                                        <span className="invalid-feedback">Field is required</span>
                                    </CustomInput>
                                </fieldset>
                            </div>
                            <hr />
                            <div className="d-flex">
                                <Button color="secondary" onClick={this.toggleStep('3')}>
                                    Previous
                                </Button>
                                <Button className="ml-auto" color="primary" type="submit">
                                    Finish
                                </Button>
                            </div>
                        </TabPane>
                    </TabContent>
                </Card>
            </Form>
        );
    }
}

export default FormWizardValidation;
