import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabPane, TabContent} from 'reactstrap';

import Sparkline from '../Common/Sparklines.js';
import FlotChart from './Flot';
import { ChartSpline, ChartArea, ChartBar, ChartBarStacked, ChartDonut, ChartLine, ChartPie } from './ChartFlot.setup.js';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../store/actions/actions';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class Dashboard extends Component {

    state = {
        examData: [],
        sparkOptions: {
            barColor: '#cfdbe2',
            height: 20,
            barWidth: 3,
            barSpacing: 2
        },
        activeTab: 'pie',

        pieChartData: [{
            label: "drink",
            color: "#4acab4",
            data: 50
        }, {
            label: "food",
            color: "#ffea88",
            data: 20
        }],

        lineChartData:[{
            label: "Complete",
            color: "#5ab1ef",
            data: [
                ["Jan", 188],
                ["Feb", 183],
                ["Mar", 185],
                ["Apr", 199],
                ["May", 190],
                ["Jun", 194],
                ["Jul", 194],
                ["Aug", 184],
                ["Sep", 74]
            ]
        }, {
            label: "In Progress",
            color: "#f5994e",
            data: [
                ["Jan", 153],
                ["Feb", 116],
                ["Mar", 136],
                ["Apr", 119],
                ["May", 148],
                ["Jun", 133],
                ["Jul", 118],
                ["Aug", 161],
                ["Sep", 59]
            ]
        }],

        barChartData: [{
            label: "Sales",
            color: "#9cd159",
            data: [
                ["Jan", 27],
                ["Feb", 82],
                ["Mar", 56],
                ["Apr", 14],
                ["May", 28],
                ["Jun", 77],
                ["Jul", 23],
                ["Aug", 49],
                ["Sep", 81],
                ["Oct", 20]
            ]
        }],
    }

    componentDidMount() {
        this.props.actions.changeSetting('isCollapsed', false);
    }

    componentWillReceiveProps( newProps ) {
        
        if ( this.state.examData.length !== newProps.examData.length ) {
            console.log( "** Dashboard New Props **", newProps )

            let pieChartData = this.state.pieChartData;
    
            let examData = newProps.examData;
            let dataCount = newProps.examData.length;
    
            let drinkCnt = 0, foodCnt = 0;

            let janCnt = 0, febCnt = 0, marCnt = 0
            let aprCnt = 0
            let mayCnt = 0
            let junCnt = 0
            let julCnt = 0
            let augCnt = 0
            let sepCnt = 0
            let octCnt = 0

            let janCnt1 = 0
            let febCnt1 = 0
            let marCnt1 = 0
            let aprCnt1 = 0
            let mayCnt1 = 0
            let junCnt1 = 0
            let julCnt1 = 0
            let augCnt1 = 0
            let sepCnt1 = 0
            let octCnt1 = 0
            
            for(var i = 0; i < dataCount; i++) {
                let exam = examData[i]
                if(exam["type"] == "drink") {
                    drinkCnt ++;
                } else {
                    foodCnt ++;
                }
                console.log("**Date**", exam.date)

                let dates = exam.date.split('-')
                let date = parseInt(dates[1])
                let status = exam.status

                if ( status === 0 ){
                    if ( date === 1 ){
                        janCnt = janCnt + 1
                    }else if ( date == 2) {
                        febCnt = febCnt + 1
                    }else if ( date == 3) {
                        marCnt = marCnt + 1
                    }else if ( date === 4){
                        aprCnt = aprCnt + 1
                    } else if ( date == 5) {
                        mayCnt = mayCnt + 1
                    } else if ( date == 6) {
                        junCnt = junCnt + 1
                    } else if ( date == 7) {
                        julCnt = julCnt + 1
                    }else if ( date == 8) {
                        augCnt = augCnt + 1
                    }else if ( date == 9) {
                        sepCnt = sepCnt + 1
                    }else if ( date == 10) {

                    }
                }else if ( status === 1) {
                    if ( date === 1 ){
                        janCnt1 = janCnt1 + 1
                    }else if ( date == 2) {
                        febCnt1 = febCnt1 + 1
                    }else if ( date == 3) {
                        marCnt1 = marCnt1 + 1
                    }else if ( date === 4){
                        aprCnt1 = aprCnt1 + 1
                    } else if ( date == 5) {
                        mayCnt1 = mayCnt1 + 1
                    } else if ( date == 6) {
                        junCnt1 = junCnt1 + 1
                    } else if ( date == 7) {
                        julCnt1 = julCnt1 + 1
                    }else if ( date == 8) {
                        augCnt1 = augCnt1 + 1
                    }else if ( date == 9) {
                        sepCnt1 = sepCnt1 + 1
                    }else if ( date == 10) {

                    }
                }
            }
    
            let drinkData = pieChartData[0];
            let foodData = pieChartData[1];
    
            drinkData.data = drinkCnt / (drinkCnt + foodCnt) * 100;
            foodData.data = foodCnt / (drinkCnt + foodCnt) * 100;
    
            pieChartData[0] = drinkData;
            pieChartData[1] = foodData;

            let barTmpChartData = [{
                label: "Sales",
                color: "#9cd159",
                data: [
                    ["Jan", janCnt + janCnt1],
                    ["Feb", febCnt + febCnt1],
                    ["Mar", marCnt + marCnt1],
                    ["Apr", aprCnt + aprCnt1],
                    ["May", mayCnt + mayCnt1],
                    ["Jun", junCnt + junCnt1],
                    ["Jul", julCnt + julCnt1],
                    ["Aug", augCnt + augCnt1],
                    
                ]
            }]


            let lineTmpChartData = [{
                label: "Complete",
                color: "#5ab1ef",
                data: [
                    ["Jan", janCnt],
                    ["Feb", febCnt],
                    ["Mar", marCnt],
                    ["Apr", aprCnt],
                    ["May", mayCnt],
                    ["Jun", junCnt],
                    ["Jul", julCnt],
                    ["Aug", augCnt],                    
                ]
            }, {
                label: "In Progress",
                color: "#f5994e",
                data: [
                    ["Jan", janCnt1],
                    ["Feb", febCnt1],
                    ["Mar", marCnt1],
                    ["Apr", aprCnt1],
                    ["May", mayCnt1],
                    ["Jun", junCnt1],
                    ["Jul", julCnt1],
                    ["Aug", augCnt1]
                ]
            }]

            this.setState({ pieChartData: pieChartData, barChartData:barTmpChartData, lineChartData:lineTmpChartData, examData: newProps.examData})

            let flotChart = this.refs.refChart
            let barChart = this.refs.refBarChart
            let lineChart = this.refs.refLineChart

            flotChart.drawChart()
            barChart.drawChart()
            lineChart.drawChart()
        }
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getMonth(dateStr) {
        console.log("DateStr = ", dateStr);
        return months[new Date(dateStr).getMonth()];
    }

    getStatus(status) {
        return status === 0 ? "Complete" : status === 1 ? "InProgress" : "Both"
    }

    render() {
        console.log( 'render =', this.state.pieChartData, ChartPie.options )
        return (
            <ContentWrapper>
                <Container fluid>
                    { /* START row */ }
                    <Row>
                        <Col lg={ 4 }>
                            <Card className="card-default">
                                <CardHeader>Pie</CardHeader>
                                <CardBody>
                                    <FlotChart ref='refChart' id='flotChart' options={ChartPie.options} data={this.state.pieChartData} className="flot-chart" height="250px"/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={ 4 }>
                            <Card className="card-default">
                                <CardHeader>Bar</CardHeader>
                                <CardBody>
                                    <FlotChart ref='refBarChart' options={ChartBar.options} data={this.state.barChartData} className="flot-chart" height="250px"/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={ 4 }>
                            <Card className="card-default">
                                <CardHeader>Line</CardHeader>
                                <CardBody>
                                    <FlotChart  ref='refLineChart' options={ChartLine.options} data={this.state.lineChartData} className="flot-chart" height="250px"/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    { /* END row */ }

                    <div className="card card-transparent">
                        <Nav tabs justified>
                            <NavItem>
                                <NavLink className={ this.state.activeTab === 'pie' ? 'active':'' }
                                    onClick={() => { this.toggleTab('pie'); }}
                                >
                                    {/* <em className="far fa-clock fa-fw"></em> */}
                                    Pie
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={ this.state.activeTab === 'bar' ? 'active':'' }
                                    onClick={() => { this.toggleTab('bar'); }}
                                >
                                    {/* <em className="far fa-money-bill-alt fa-fw"></em> */}
                                    Bar
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={ this.state.activeTab === 'line' ? 'active':'' }
                                    onClick={() => { this.toggleTab('line'); }}
                                >
                                    {/* <em className="far fa-money-bill-alt fa-fw"></em> */}
                                    Line
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab} className="bg-white p-0">
                            <TabPane tabId="pie">
                                {/* START table responsive */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Id</th>
                                                <th>Type</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.examData && this.state.examData.map((data, index) => { 
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{data._id}</td>
                                                            <td>{data.type}</td>
                                                            <td>{this.getStatus(data.status)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* END table responsive */}
                            </TabPane>
                            <TabPane tabId="bar">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Id</th>
                                                <th>Type</th>
                                                <th>Month</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.examData && this.state.examData.map((data, index) => { 
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{data._id}</td>
                                                            <td>{data.type}</td>
                                                            <td>{this.getMonth(data.date)}</td>
                                                            <td>{this.getStatus(data.status)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </TabPane>
                            <TabPane tabId="line">
                                {/* START table responsive */}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Id</th>
                                                <th>Type</th>
                                                <th>Month</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.examData && this.state.examData.map((data, index) => { 
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{data._id}</td>
                                                            <td>{data.type}</td>
                                                            <td>{this.getMonth(data.date)}</td>
                                                            <td>{this.getStatus(data.status)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* END table responsive */}
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </ContentWrapper>
            );
    }

}

const mapStateToProps = ({ filter }) => ({ err: filter.err, examData: filter.examData })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Dashboard));
