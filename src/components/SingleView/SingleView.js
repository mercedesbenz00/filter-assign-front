import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Thermometer from "react-thermometer";
import { LinearGauge, RadialGauge} from "react-canvas-gauges";

class SingleView extends React.Component {

    state = {
      dropdownOpen: false
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                   <div>Single View
                      <small><Trans i18nKey='dashboard.WELCOME'></Trans></small>
                   </div>
                    { /* START Language list */ }
                    <div className="ml-auto">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                English
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
                                <DropdownItem onClick={() => this.changeLanguage('en')}>English</DropdownItem>
                                <DropdownItem onClick={() => this.changeLanguage('es')}>Spanish</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    { /* END Language list */ }
                </div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h2 className="text-thin">Single view content</h2>
                        <p>
                            This project is an application skeleton. You can use it to quickly bootstrap your ReactJS webapp projects and dev environment for these projects.
                            <br/>
                            The seed app doesn't do much and has most of the feature removed so you can add theme as per your needs just following the demo app examples.
                        </p>
                    </Col>

                    <div style={{width: '400px', height: '400px', padding:'50px' }}>
                        <Thermometer
                                min={0}
                                max={30}
                                width={20}
                                height={300}
                                backgroundColor={'blue'}
                                fillColor={'green'}
                                current={10}
                        />
                        
                    </div>

                    <div style={{width: '400px', height: '400px', padding:'50px' }}>
                        <RadialGauge
                            units='°C'
                            title='Temperature'
                            value={30}
                            minValue={0}
                            maxValue={50}
                            majorTicks={['0', '5', '15', '20', '25', '30', '35', '40', '45', '50']}
                            minorTicks={2}
                            ></RadialGauge>
                    </div>

                    <div style={{width: '400px', height: '500px', padding:'50px' }}>
                        <LinearGauge
                            units='°C'
                            title='Temperature'
                            value={30}
                            minValue={0}
                            maxValue={50}
                            width={100}
                            height={300}
                            majorTicks={['0', '15', '30', '45', '50']}
                            minorTicks={2}
                            ></LinearGauge>
                    </div>

                </Row>
            </ContentWrapper>
        );
    }
}

export default withTranslation('translations')(SingleView);
