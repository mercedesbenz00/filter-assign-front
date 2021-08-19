import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

/**
 * Updates every second the content of the element
 * with the current time formmated
 */
export default class Now extends Component {

    static propTypes = {
        /** string to format current date */
        format: PropTypes.string.isRequired
    }

    state = {
        currentTime: null,
        format: ''
    }

    componentDidMount() {
        this.updateTime();
        this.interval = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        if(this.interval)
            clearInterval(this.interval);
    }

    updateTime = () => {
        this.setState({
            currentTime: moment(new Date()).format(this.props.format)
        })
    }

    render() {
        return (
            <div {...this.props} style={{display: 'inline-block'}}>
                {this.state.currentTime}
            </div>
        )
    }
}
