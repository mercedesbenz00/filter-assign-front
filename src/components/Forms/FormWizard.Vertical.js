import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';

const stepNavitemStyle = {
    backgroundColor: '#fcfcfc'
};

class FormWizardVertical extends Component {
    state = {
        activeStep: '1'
    };

    toggleStep = activeStep => () => {
        if (this.state.activeStep !== activeStep) {
            this.setState({
                activeStep
            });
        }
    };

    done = () => {
        alert('Custom message without form submission.');
    };

    render() {
        return (
            <Card className="card-default">
                <CardHeader>Vertical Example (without validation)</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="4">
                            <Nav pills vertical={true}>
                                <NavItem style={stepNavitemStyle}>
                                    <NavLink
                                        tag="div"
                                        className={classnames({
                                            active: this.state.activeStep === '1'
                                        })}
                                        onClick={this.toggleStep('1')}
                                    >
                                        <h4 className="text-left my-3">1. First Step</h4>
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
                                        <h4 className="text-left my-3">2. Second Step</h4>
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
                                        <h4 className="text-left my-3">3. Third Step</h4>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col xs="8">
                            <TabContent activeTab={this.state.activeStep} className="border-0">
                                <TabPane tabId="1">
                                    <div className="pt-3 mb-3">
                                        <fieldset>
                                            <h2>Step 1</h2>
                                            <p className="lead">
                                                Nunc pharetra, elit ut lobortis vehicula, nisl metus
                                                tincidunt mauris, vitae accumsan arcu justo sit amet
                                                odio.{' '}
                                            </p>
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
                                <TabPane tabId="2">
                                    <div className="pt-3 mb-3">
                                        <fieldset>
                                            <h2>Step 2</h2>
                                            <p className="lead">
                                                Nunc pharetra, elit ut lobortis vehicula, nisl metus
                                                tincidunt mauris, vitae accumsan arcu justo sit amet
                                                odio.{' '}
                                            </p>
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
                                <TabPane tabId="3">
                                    <div className="pt-3 mb-3">
                                        <fieldset>
                                            <h2>Step 3</h2>
                                            <p className="lead">
                                                Nunc pharetra, elit ut lobortis vehicula, nisl metus
                                                tincidunt mauris, vitae accumsan arcu justo sit amet
                                                odio.{' '}
                                            </p>
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
                                            onClick={this.done}
                                        >
                                            Done
                                        </Button>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default FormWizardVertical;
