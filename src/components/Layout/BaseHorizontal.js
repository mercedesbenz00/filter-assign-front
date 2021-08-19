import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';

import HeaderHorizontal from './HeaderHorizontal'
import Offsidebar from './Offsidebar'
import Footer from './Footer'

class BaseHorizontal extends Component {
    /* Toggle Horizontal layout for demo purposes.
       Set the 'horizontal' flag using redux in the settingsReducer
       and remove below methods so it gets rendered by default
    */
    componentDidMount = () => this.props.actions.changeSetting('horizontal', true);
    componentWillUnmount = () => this.props.actions.changeSetting('horizontal', false);

    render() {
        return (
            <div className="wrapper">
                <HeaderHorizontal />

                <Offsidebar />

                <section className="section-container">
                    { this.props.children }
                </section>

                <Footer />
            </div>
        );
    }

}

BaseHorizontal.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseHorizontal);
