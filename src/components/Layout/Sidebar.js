import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';

import SidebarRun from './Sidebar.run';
import SidebarUserBlock from './SidebarUserBlock';

import Menu from '../../Menu.js';
import FormValidator from '../Forms/FormValidator.js';
import Select from 'react-select';

/** Component to display headings on sidebar */
const SidebarItemHeader = ({item}) => (
    <li className="nav-heading">
        <span><Trans i18nKey={item.translate}>{item.heading}</Trans></span>
    </li>
)

/** Normal items for the sidebar */
const SidebarItem = ({item, isActive}) => (
    <li className={ isActive ? 'active' : '' }>
        <Link to={item.path} title={item.name}>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span><Trans i18nKey={item.translate}>{item.name}</Trans></span>
        </Link>
    </li>
)

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({item, isActive, handler, children, isOpen}) => (
    <li className={ isActive ? 'active' : '' }>
        <div className="nav-item" onClick={ handler }>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span><Trans i18nKey={item.translate}>{item.name}</Trans></span>
        </div>
        <Collapse isOpen={ isOpen }>
            <ul id={item.path} className="sidebar-nav sidebar-subnav">
                { children }
            </ul>
        </Collapse>
    </li>
)

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({item}) => (
    <li className="sidebar-subnav-header">{item.name}</li>
)

const TypeOption = [
    {"type":"drink", "name":"Drink"," index": 0},
    {"type":"food", "name":"Food", "index": 1},
]

const StatusOption = [
    {"status":"Complete", "index": 0},
    {"status":"InProgress", "index": 1},
    // {"status":"Both", "index": 2},
]

class Sidebar extends Component {

    state = {
        collapse: {},
        
        formFilter: {
            filter1: '',
            filter2: '',
        },

        selectedType:{},
        selectedStatus:{},
    }

    componentDidMount() {
        // pass navigator to access router api
        SidebarRun(this.navigator, this.closeSidebar);
        // prepare the flags to handle menu collapsed states
        this.buildCollapseList()

        // Listen for routes changes in order to hide the sidebar on mobile
        this.props.history.listen(this.closeSidebar);
    }

    closeSidebar = () => {
        this.props.actions.changeSetting('asideToggled', false);
    }

    /** prepare initial state of collapse menus. Doesnt allow same route names */
    buildCollapseList = () => {
        let collapse = {};
        Menu
            .filter(({heading}) => !heading)
            .forEach(({name, path, submenu}) => {
                collapse[name] = this.routeActive(submenu ? submenu.map(({path})=>path) : path)
            })
        this.setState({collapse});
    }

    navigator = route => {
        this.props.history.push(route.replace('#','')); // remove '#' in case of use HashRouter
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        return paths.some(p => this.props.location.pathname.indexOf(p) > -1)
    }

    toggleItemCollapse(stateName) {
        // eslint-disable-next-line
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== stateName)
                this.setState({
                    collapse: {
                        [c]: false
                    }
                });
        }
        this.setState({
            collapse: {
                [stateName]: !this.state.collapse[stateName]
            }
        });
    }

    getSubRoutes = item => item.submenu.map(({path}) => path)

    /** map menu config to string to determine which element to render */
    itemType = item => {
        if (item.heading) return 'heading';
        if (!item.submenu) return 'menu';
        if (item.submenu) return 'submenu';
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
            // console.log( '*** click apply ***', this.state.formFilter.filter1, this.state.formFilter.filter2)
            // this.props.actions.filter(this.state.formFilter.filter1, parseInt(this.state.formFilter.filter2));
        }
    }

    filter1Changed = e => {
        console.log( "** Filter1 **", e.type)
        let filter = e.type;
        let formFilter = this.state.formFilter;
        formFilter.filter1 = filter;

        this.setState({ formFilter: formFilter, selectedType:{"type": filter}})
        this.props.actions.changeSetting('filter1Index', e.index)
    }

    filter2Changed = e => {
        
        let filter = e.index;
        let formFilter = this.state.formFilter;
        formFilter.filter2 = filter;
        
        this.setState({ formFilter: formFilter, selectedStatus:{"index": filter }})
        
        console.log( "** Filter2 **", this.state.formFilter)
        this.props.actions.changeSetting('filter2Index', e.index)
    }
    render() {
        return (
            <aside className='aside-container'>
                { /* START Sidebar (left) */ }
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">
                        { /* START sidebar nav */ }
                        <ul className="sidebar-nav">
                            { /* START user info */ }
                            <li className="has-user-block">
                                <SidebarUserBlock/>
                            </li>
                            { /* END user info */ }
                            <li className="has-user-block mb-3 mr-2 ml-2 mt-3">
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <Select                
                                            placeholder='Filter1'
                                            defaultValue={-1}
                                            value={TypeOption[this.props.settings.filter1Index]}
                                            onChange={(e) => this.filter1Changed(e)}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            data-validate='["required"]'
                                            options={TypeOption}
                                            getOptionValue={option => option['name']}
                                            getOptionLabel={option => option['name']}
                                        />   
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <Select                                            
                                            placeholder='Filter2'
                                            defaultValue={-1}
                                            value={StatusOption[this.props.settings.filter2Index]}
                                            onChange={(e) => this.filter2Changed(e)}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            data-validate='["required"]'
                                            options={StatusOption}
                                            getOptionValue={option => option['status']}
                                            getOptionLabel={option => option['status']}
                                        />   
                                    </div>
                                </div>
                                <button className="btn btn-block btn-primary" onClick={ (e) => {
                                    this.props.actions.filter(this.state.formFilter.filter1, this.state.formFilter.filter2);
                                }}>Apply</button>
                            </li>
                        </ul>
                        { /* END sidebar nav */ }
                    </nav>
                </div>
                { /* END Sidebar (left) */ }
            </aside>
        );
    }
}

Sidebar.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation('translations')(withRouter(Sidebar)));
