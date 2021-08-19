import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter} from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderRun from './Header.run'
import { USER_DATA } from '../../const/const'
class Header extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        HeaderRun();
    }

    toggleUserblock = e => {
        e.preventDefault();
        this.props.actions.toggleSetting('showUserBlock');
    }

    toggleOffsidebar = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('offsidebarOpen');
    }

    toggleCollapsed = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('asideToggled');
    }

    resize () {
        // all IE friendly dispatchEvent
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        // modern dispatchEvent way
        // window.dispatchEvent(new Event('resize'));
    }

    logout() {
        this.props.actions.logout();
        this.props.history.entries = [];
        this.props.history.index = -1;
        this.props.history.push('/login');
    }

    getUserName() {
        if(JSON.parse(localStorage.getItem( USER_DATA )) !== null )
        {
            return JSON.parse(localStorage.getItem( USER_DATA)).name;
        }
        return "Mike";
    }

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar">
                    { /* START Left navbar */ }
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                            <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>
                                <em className="fas fa-bars"></em>
                            </a>
                            { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */ }
                            <a href=""  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>
                                <em className="fas fa-bars"></em>
                            </a>
                        </li>
                        { /* START User avatar toggle */ }
                        <li className="nav-item d-none d-md-block">
                            <a  className="nav-link" onClick={ this.toggleUserblock }>
                                <em className="icon-user"></em>
                            </a>
                        </li>
                        { /* END User avatar toggle */ }
                        { /* START lock screen */ }
                        <li className="nav-item d-none d-md-block">
                            <Link to="lock" title="Lock screen" className="nav-link">
                                <em className="icon-lock"></em>
                            </Link>
                        </li>
                        { /* END lock screen */ }
                    </ul>
                    { /* END Left navbar */ }
                    { /* START Right Navbar */ }
                    <ul className="navbar-nav flex-col">
                        <li className="nav-item d-none d-md-block mr-3 mt-2" style={{color: 'white'}}>
                            <h6>{"Welcome, " + `${this.getUserName()}`} </h6>
                        </li>
                        <li className="nav-item d-none d-md-block" style={{color: 'white'}}>
                            <h6 style={{cursor:'pointer'}} onClick={() => this.logout() }> Logout   <em className="icon-logout"></em> </h6>
                        </li>
                        { /* Search icon */ }
                        <li className="nav-item" style={{display: 'none'}}>
                            <a className="nav-link" href="" data-search-open="">
                                <em className="icon-magnifier"></em>
                            </a>
                        </li>
                        { /* Fullscreen (only desktops) */ }
                        <li className="nav-item d-none d-md-block"  style={{display: 'none'}}>
                            <ToggleFullscreen className="nav-link"  style={{display: 'none'}}/>
                        </li>
                        { /* START Alert menu */ }
                        <UncontrolledDropdown nav inNavbar className="dropdown-list"  style={{display: 'none'}}>
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
                        <li className="nav-item"  style={{display: 'none'}}>
                            <a className="nav-link" href="" onClick={this.toggleOffsidebar}>
                                <em className="icon-notebook"></em>
                            </a>
                        </li>
                        { /* END Offsidebar menu */ }
                    </ul>
                    { /* END Right Navbar */ }

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

Header.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));