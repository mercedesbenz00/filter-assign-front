import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledDropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem,
         ListGroup,
         ListGroupItem,
         Nav,
         Collapse,
         NavItem,
         NavLink,
         NavbarToggler } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderRun from './Header.run'

class HeaderHorizontal extends Component {

    state = {
      isOpen: false
    }

    componentDidMount() {
        HeaderRun();

        // Listen for routes changes in order to hide the sidebar on mobile
        this.props.history.listen(() => {
            this.setState({
                isOpen: false
            });
        });
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleOffsidebar = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('offsidebarOpen');
    }

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar navbar-expand-lg navbar-light">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo">
                                <img className="img-fluid" src="img/logo.png" alt="App Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                        <NavbarToggler onClick={this.toggle} />
                    </div>
                    { /* END navbar header */ }
                    { /* START Nav wrapper */ }
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="mr-auto flex-column flex-lg-row">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>Dashboard</DropdownToggle>
                                <DropdownMenu className="animated fadeIn">
                                    <Link className="dropdown-item" to="dashboard">Dashboard v1</Link>
                                    <Link className="dropdown-item" to="dashboardv2">Dashboard v2</Link>
                                    <Link className="dropdown-item" to="dashboardv3">Dashboard v3</Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Link className="nav-link" to="widgets">Widgets</Link>
                            </NavItem>
                            { /* END Left navbar */ }
                        </Nav>
                        <Nav className="flex-row" navbar>
                            { /* Search icon */ }
                            <NavItem>
                                <NavLink href="" data-search-open="">
                                    <em className="icon-magnifier"></em>
                                </NavLink>
                            </NavItem>
                            { /* Fullscreen (only desktops) */ }
                            <NavItem className="d-none d-md-block">
                                <ToggleFullscreen className="nav-link"/>
                            </NavItem>
                            { /* START Alert menu */ }
                            <UncontrolledDropdown nav inNavbar className="dropdown-list">
                                <DropdownToggle nav className="dropdown-toggle-nocaret">
                                    <em className="icon-bell"></em>
                                    <span className="badge badge-danger">11</span>
                                </DropdownToggle>
                                { /* START Dropdown menu */ }
                                <DropdownMenu right className="dropdown-menu-right animated flipInX">
                                    <DropdownItem>
                                        { /* START list group */ }
                                        <ListGroup>
                                           <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                              <div className="media">
                                                 <div className="align-self-start mr-2">
                                                    <em className="fab fa-twitter fa-2x text-info"></em>
                                                 </div>
                                                 <div className="media-body">
                                                    <p className="m-0">New followers</p>
                                                    <p className="m-0 text-muted text-sm">1 new follower</p>
                                                 </div>
                                              </div>
                                           </ListGroupItem>
                                           <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                              <div className="media">
                                                 <div className="align-self-start mr-2">
                                                    <em className="fa fa-envelope fa-2x text-warning"></em>
                                                 </div>
                                                 <div className="media-body">
                                                    <p className="m-0">New e-mails</p>
                                                    <p className="m-0 text-muted text-sm">You have 10 new emails</p>
                                                 </div>
                                              </div>
                                           </ListGroupItem>
                                           <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                              <div className="media">
                                                 <div className="align-self-start mr-2">
                                                    <em className="fa fa-tasks fa-2x text-success"></em>
                                                 </div>
                                                 <div className="media-body">
                                                    <p className="m-0">Pending Tasks</p>
                                                    <p className="m-0 text-muted text-sm">11 pending task</p>
                                                 </div>
                                              </div>
                                           </ListGroupItem>
                                           <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                              <span className="d-flex align-items-center">
                                                 <span className="text-sm">More notifications</span>
                                                 <span className="badge badge-danger ml-auto">14</span>
                                              </span>
                                           </ListGroupItem>
                                        </ListGroup>
                                        { /* END list group */ }
                                    </DropdownItem>
                                </DropdownMenu>
                                { /* END Dropdown menu */ }
                            </UncontrolledDropdown>
                            { /* END Alert menu */ }
                            { /* START Offsidebar button */ }
                            <NavItem>
                                <NavLink href="" onClick={this.toggleOffsidebar}>
                                    <em className="icon-notebook"></em>
                                </NavLink>
                            </NavItem>
                            { /* END Offsidebar menu */ }
                        </Nav>
                    </Collapse>
                    { /* END Nav wrapper */ }
                    { /* START Search form */ }
                    <form className="navbar-form" role="search" action="search.html">
                       <div className="form-group">
                          <input className="form-control" type="text" placeholder="Type and hit enter ..."/>
                          <div className="fa fa-times navbar-form-close" data-search-dismiss=""></div>
                       </div>
                       <button className="d-none" type="submit">Submit</button>
                    </form>
                    { /* END Search form */ }
                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }

}

HeaderHorizontal.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HeaderHorizontal));
