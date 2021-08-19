// SPARKLINE
// -----------------------------------
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
// Sparklines
import 'jquery-sparkline/jquery.sparkline.min.js';

const RESIZE_EVENT = 'resize.sparkline';

/**
 * Wrapper for for jquery-sparkline plugin
 */
export default class Sparkline extends Component {

    static propTypes = {
        /** sparkline options object */
        options: PropTypes.object.isRequired,
        /** tag to use, defaults to div */
        tag: PropTypes.string,
        /** values to display, allows array or csv string */
        values: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.array.isRequired
        ])
    }

    static defaultProps = {
        options: {},
        tag: 'div'
    }

    state = {
        values: this.props.values,
        options: this.props.options
    }

    componentDidMount() {
        this.renderChart();
        // allow responsive
        if (this.state.options.resize) {
            $(window).on(RESIZE_EVENT, () => {
                this.renderChart();
            });
        }
    }

    getNormalizedParams() {
        let { options, values } = this.state;

        options.disableHiddenCheck = true; // allow draw when initially is not visible
        options.type = options.type || 'bar'; // default chart is bar
        values = Array.isArray(values) ? values : values.split(','); // support array of csv strings

        return { options, values }
    }

    renderChart() {
        let { options, values } = this.getNormalizedParams()
        // init sparkline
        $(this.element).sparkline(values, options);
    }

    componentWillUnmount() {
        $(window).off(RESIZE_EVENT);
        $(this.element).sparkline('destroy');
    }

    setRef = node => {
        this.element = node;
    }

    render() {
        const {tag:Tag} = this.props;
        return (
            <Tag ref={this.setRef} {...this.props}></Tag>
        )
    }
}