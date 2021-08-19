import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import { connect } from 'react-redux';
import { USER_DATA } from '../../const/const'

class SidebarUserBlock extends Component {

    state = {
        showUserBlock: false
    }

    componentDidUpdate(oldProps) {
        if (oldProps.showUserBlock !== this.props.showUserBlock) {
            this.setState({ showUserBlock: this.props.showUserBlock })
        }
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
            <Collapse id="user-block" isOpen={ this.state.showUserBlock }>
                <div>
                    <div className="item user-block">
                       {/* User picture */}
                       <div className="user-block-picture">
                          <div className="user-block-status">
                             <img className="img-thumbnail rounded-circle" src="img/user/02.jpg" alt="Avatar" width="60" height="60" />
                             <div className="circle bg-success circle-lg"></div>
                          </div>
                       </div>
                       {/* Name and Job */}
                       <div className="user-block-info">
                          <span className="user-block-name">{"Hello, " + `${this.getUserName()}`}</span>
                          <span className="user-block-role">Designer</span>
                       </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}

SidebarUserBlock.propTypes = {
    showUserBlock: PropTypes.bool
};

const mapStateToProps = state => ({ showUserBlock: state.settings.showUserBlock })

export default connect(
    mapStateToProps
)(SidebarUserBlock);