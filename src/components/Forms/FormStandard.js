import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    FormFeedback,
    FormText,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class FormStandard extends Component {

    state = {
        dropdownOpen: false,
        splitButtonOpen: false
    }

    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSplit = () => {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    }

    onSubmit = e => {
        console.log('Form submitted..');
        e.preventDefault();
    }

    render() {

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Form Elements
                        <small>Standard and custom elements for any form</small>
                    </div>
                </div>
                {/* START card */}
                <Card className="card-default">
                    <CardHeader>Inline form</CardHeader>
                    <CardBody>
                        <form onSubmit={this.onSubmit}>
                          <div className="form-row align-items-center">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                              <Input type="text" className="mb-2" id="inlineFormInput" placeholder="Jane Doe"/>
                            </div>
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                              <InputGroup className="mb-2">
                                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                <Input placeholder="username" />
                              </InputGroup>
                            </div>
                            <div className="col-auto">
                                <div className="checkbox c-checkbox">
                                    <label className="mb-1">
                                        <Input type="checkbox"/>
                                        <span className="fa fa-check"></span>Remember</label>
                                </div>
                            </div>
                            <div className="col-auto">
                              <button type="submit" className="btn btn-primary mb-2">Submit</button>
                            </div>
                          </div>
                        </form>
                    </CardBody>
                </Card>
                {/* END card */}
                {/* START row */}
                <div className="row">
                    <div className="col-md-6">
                        {/* START card */}
                        <Card className="card-default">
                            <CardHeader>Stacked form</CardHeader>
                            <CardBody>
                                <form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <label>Email address</label>
                                        <Input type="email" placeholder="Enter email"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input type="password" placeholder="Password"/>
                                    </FormGroup>
                                    <div className="checkbox c-checkbox">
                                        <label>
                                            <Input type="checkbox" defaultChecked=""/>
                                            <span className="fa fa-times"></span>Check me out</label>
                                    </div>
                                    <button className="btn btn-sm btn-secondary" type="submit">Submit</button>
                                </form>
                            </CardBody>
                        </Card>
                        {/* END card */}
                    </div>
                    <div className="col-md-6">
                        {/* START card */}
                        <Card className="card-default">
                            <CardHeader>Horizontal form</CardHeader>
                            <CardBody>
                                <form className="form-horizontal" onSubmit={this.onSubmit}>
                                    <FormGroup row>
                                        <label className="col-xl-2 col-form-label">Email</label>
                                        <div className="col-xl-10">
                                            <Input type="email" placeholder="Email"/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup row>
                                        <label className="col-xl-2 col-form-label">Password</label>
                                        <div className="col-xl-10">
                                            <Input type="password" placeholder="Password"/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup row>
                                        <div className="col-xl-10">
                                            <div className="checkbox c-checkbox">
                                                <label>
                                                    <Input type="checkbox" defaultChecked=""/>
                                                    <span className="fa fa-check"></span>Remember me</label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup row>
                                        <div className="col-xl-10">
                                            <button className="btn btn-sm btn-secondary" type="submit">Sign in</button>
                                        </div>
                                    </FormGroup>
                                </form>
                            </CardBody>
                        </Card>
                        {/* END card */}
                    </div>
                </div>
                {/* END row */}
                {/* START card */}
                <Card className="card-default">
                    <CardHeader>Form elements</CardHeader>
                    <CardBody>
                        <form className="form-horizontal" method="get" action="/" onSubmit={this.onSubmit}>
                            <fieldset>
                                <legend>Classic inputs</legend>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Rounded Corners</label>
                                    <div className="col-md-10">
                                        <Input className="form-control-rounded" type="text"/>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">With help</label>
                                    <div className="col-md-10">
                                        <Input type="text"/>
                                        <span className="form-text">A block of help text that breaks onto a new line and may extend beyond one line.</span>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label" htmlFor="input-id-1">Label focus</label>
                                    <div className="col-md-10">
                                        <Input id="input-id-1" type="text"/>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Password</label>
                                    <div className="col-md-10">
                                        <Input type="password" name="password"/>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Placeholder</label>
                                    <div className="col-md-10">
                                        <Input type="text" placeholder="placeholder"/>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Disabled</label>
                                    <div className="col-md-10">
                                        <Input type="text" placeholder="Disabled input here..." disabled=""/>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Static control</label>
                                    <div className="col-md-10">
                                        <Input plaintext/>Some plain text/ static value
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Checkboxes and radios</label>
                                    <div className="col-md-10">
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1" />{' '} Option one is this and that—be sure to include why it's great
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1" />{' '} Option two can be something else and selecting it will deselect option one
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" name="radio1" disabled />{' '} Option three is disabled
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" />{' '} Check me out
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Inline checkboxes and Radios</label>
                                    <div className="col-md-10">
                                        <FormGroup check inline>
                                          <Label check>
                                            <Input type="checkbox" /> Some input
                                          </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Label check>
                                             <Input type="checkbox" /> Some other input
                                          </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Label check>
                                            <Input type="radio" name="inlineradio" /> Some input
                                          </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Label check>
                                             <Input type="radio" name="inlineradio" /> Some other input
                                          </Label>
                                        </FormGroup>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset className="last-child">
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Select</label>
                                    <div className="col-md-10">
                                        <select defaultValue="" className="custom-select custom-select-lg mb-3">
                                            <option>Open this select menu</option>
                                            <option defaultValue="1">One</option>
                                            <option defaultValue="2">Two</option>
                                            <option defaultValue="3">Three</option>
                                        </select>
                                        <select defaultValue="" className="custom-select custom-select-sm">
                                            <option>Open this select menu</option>
                                            <option defaultValue="1">One</option>
                                            <option defaultValue="2">Two</option>
                                            <option defaultValue="3">Three</option>
                                        </select>
                                        <div className="row mt-3">
                                            <div className="col-xl-4">
                                                <select defaultValue="" className="custom-select" multiple="">
                                                    <option>Open this select menu</option>
                                                    <option defaultValue="1">One</option>
                                                    <option defaultValue="2">Two</option>
                                                    <option defaultValue="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <legend>Input variants</legend>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Custom Checkboxes &amp; radios</label>
                                    <div className="col-md-10">
                                        <div className="checkbox c-checkbox">
                                            <label>
                                                <Input type="checkbox" defaultValue=""/>
                                                <span className="fa fa-check"></span>Option one</label>
                                        </div>
                                        <div className="checkbox c-checkbox">
                                            <label>
                                                <Input type="checkbox" defaultChecked="" defaultValue=""/>
                                                <span className="fa fa-check"></span>Option two defaultChecke</label>
                                        </div>
                                        <div className="checkbox c-checkbox">
                                            <label>
                                                <Input type="checkbox" defaultChecked="" disabled="" defaultValue=""/>
                                                <span className="fa fa-check"></span>Option three defaultChecke and disabled</label>
                                        </div>
                                        <div className="checkbox c-checkbox">
                                            <label>
                                                <Input type="checkbox" disabled="" defaultValue=""/>
                                                <span className="fa fa-check"></span>Option four disabled</label>
                                        </div>
                                        <div className="c-radio">
                                            <label>
                                                <Input type="radio" name="a" defaultValue="option1"/>
                                                <span className="fa fa-circle"></span>Option one</label>
                                        </div>
                                        <div className="c-radio">
                                            <label>
                                                <Input type="radio" name="a" defaultValue="option2" defaultChecked=""/>
                                                <span className="fa fa-circle"></span>Option two defaultChecke</label>
                                        </div>
                                        <div className="c-radio">
                                            <label>
                                                <Input type="radio" defaultValue="option2" defaultChecked="" disabled=""/>
                                                <span className="fa fa-circle"></span>Option three defaultChecke and disabled</label>
                                        </div>
                                        <div className="c-radio">
                                            <label>
                                                <Input type="radio" name="a" disabled=""/>
                                                <span className="fa fa-circle"></span>Option four disabled</label>
                                        </div>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Inline checkboxes</label>
                                    <div className="col-md-10">
                                        <label className="c-checkbox">
                                            <Input id="inlineCheckbox10" type="checkbox" defaultValue="option1"/>
                                            <span className="fa fa-check"></span>a</label>
                                        <label className="c-checkbox">
                                            <Input id="inlineCheckbox20" type="checkbox" defaultValue="option2"/>
                                            <span className="fa fa-check"></span>b</label>
                                        <label className="c-checkbox">
                                            <Input id="inlineCheckbox30" type="checkbox" defaultValue="option3"/>
                                            <span className="fa fa-check"></span>c</label>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Rounded</label>
                                    <div className="col-md-10">
                                        <label className="checkbox c-checkbox c-checkbox-rounded">
                                            <Input id="roundedcheckbox10" type="checkbox" defaultChecked/>
                                            <span className="fa fa-check"></span>Lorem</label>
                                        <label className="checkbox c-checkbox c-checkbox-rounded">
                                            <Input id="roundedcheckbox20" type="checkbox"/>
                                            <span className="fa fa-check"></span>Ipsum</label>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Inline radios</label>
                                    <div className="col-md-10">
                                        <label className="c-radio">
                                            <Input id="inlineradio1" type="radio" name="i-radio" defaultValue="option1" defaultChecked/>
                                            <span className="fa fa-circle"></span>a</label>
                                        <label className="c-radio">
                                            <Input id="inlineradio2" type="radio" name="i-radio" defaultValue="option2"/>
                                            <span className="fa fa-circle"></span>b</label>
                                        <label className="c-radio">
                                            <Input id="inlineradio3" type="radio" name="i-radio" defaultValue="option3"/>
                                            <span className="fa fa-circle"></span>c</label>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Custom icons</label>
                                    <div className="col-md-10">
                                        <label className="c-radio">
                                            <Input id="inlineradio10" type="radio" name="i-radio" defaultValue="option1" defaultChecked/>
                                            <span className="fa fa-check"></span>a</label>
                                        <label className="c-radio">
                                            <Input id="inlineradio20" type="radio" name="i-radio" defaultValue="option2" defaultChecked/>
                                            <span className="fa fa-user"></span>b</label>
                                        <label className="c-radio">
                                            <Input id="inlineradio30" type="radio" name="i-radio" defaultValue="option3" defaultChecked/>
                                            <span className="fa fa-tint"></span>c</label>
                                        <br/>
                                        <label className="c-checkbox">
                                            <Input id="inlinecheckbox10" type="checkbox" defaultValue="option1" defaultChecked/>
                                            <span className="fa fa-star"></span>a</label>
                                        <label className="c-checkbox">
                                            <Input id="inlinecheckbox20" type="checkbox" defaultValue="option2" defaultChecked/>
                                            <span className="fa fa-heart"></span>b</label>
                                        <label className="c-checkbox">
                                            <Input id="inlinecheckbox30" type="checkbox" defaultValue="option3" defaultChecked/>
                                            <span className="fa fa-bell"></span>c</label>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Input validation</label>
                                    <div className="col-md-10">
                                        <FormGroup>
                                          <Label for="exampleEmail">Input without validation</Label>
                                          <Input />
                                          <FormFeedback>You will not be able to see this</FormFeedback>
                                          <FormText>Example help text that remains unchanged.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="exampleEmail">Valid input</Label>
                                          <Input valid />
                                          <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                          <FormText>Example help text that remains unchanged.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="examplePassword">Invalid input</Label>
                                          <Input invalid />
                                          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                                          <FormText>Example help text that remains unchanged.</FormText>
                                        </FormGroup>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Column sizing</label>
                                    <div className="col-md-10">
                                        <Row>
                                            <Col lg="2">
                                                <Input type="text" placeholder=".col-lg-2"/>
                                            </Col>
                                            <Col lg="3">
                                                <Input type="text" placeholder=".col-lg-3"/>
                                            </Col>
                                            <Col lg="4">
                                                <Input type="text" placeholder=".col-lg-4"/>
                                            </Col>
                                        </Row>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Input groups</label>
                                    <div className="col-md-10">
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                        <Input placeholder="username" />
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Check it out" />
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <Input placeholder="username" />
                                        <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>$</InputGroupText>
                                          <InputGroupText>$</InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Dolla dolla billz yo!" />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>$</InputGroupText>
                                          <InputGroupText>$</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                        <Input placeholder="Amount" type="number" step="1" />
                                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                      </InputGroup>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">Button addons</label>
                                    <div className="col-md-10">
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>To the Left!</InputGroupText>
                                        </InputGroupAddon>
                                        <Input />
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <Input />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>To the Right!</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                      <br />
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>To the Left!</InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="and..." />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>To the Right!</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup row>
                                    <label className="col-md-2 col-form-label">With dropdowns</label>
                                    <div className="col-md-10">
                                        <InputGroup>
                                          <InputGroupAddon addonType="prepend"><Button>I'm a button</Button></InputGroupAddon>
                                          <Input />
                                        </InputGroup>
                                        <br />
                                        <InputGroup>
                                          <Input />
                                          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                            <DropdownToggle caret>
                                              Button Dropdown
                                            </DropdownToggle>
                                            <DropdownMenu>
                                              <DropdownItem header>Header</DropdownItem>
                                              <DropdownItem disabled>Action</DropdownItem>
                                              <DropdownItem>Another Action</DropdownItem>
                                              <DropdownItem divider />
                                              <DropdownItem>Another Action</DropdownItem>
                                            </DropdownMenu>
                                          </InputGroupButtonDropdown>
                                        </InputGroup>
                                        <br />
                                        <InputGroup>
                                          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                                            <Button outline>Split Button</Button>
                                            <DropdownToggle split outline />
                                            <DropdownMenu>
                                              <DropdownItem header>Header</DropdownItem>
                                              <DropdownItem disabled>Action</DropdownItem>
                                              <DropdownItem>Another Action</DropdownItem>
                                              <DropdownItem divider />
                                              <DropdownItem>Another Action</DropdownItem>
                                            </DropdownMenu>
                                          </InputGroupButtonDropdown>
                                          <Input placeholder="and..." />
                                          <InputGroupAddon addonType="append"><Button color="secondary">I'm a button</Button></InputGroupAddon>
                                        </InputGroup>                                    </div>
                                </FormGroup>
                            </fieldset>
                        </form>
                    </CardBody>
                </Card>
                {/* END card */}
            </ContentWrapper>
            );
    }

}

export default FormStandard;
