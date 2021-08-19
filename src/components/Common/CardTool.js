// Card Tools
// -----------------------------------
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const checkRequiredProps = (props, propName, componentName) => {
  if (!props.dismiss && !props.refresh) {
    return new Error(`One of 'dismiss' or 'refresh' is required by '${componentName}' component.`)
  }
}

/**
 * Add action icons to card components to allow
 * refresh data or remove a card element
 */
class CardTool extends Component {

    static propTypes = {
        /** show the refreshe icon */
        refresh: checkRequiredProps,
        /** show the remove icon */
        dismiss: checkRequiredProps,
        /** triggers before card is removed */
        onRemove: PropTypes.func,
        /** triggers after card was removed */
        onRemoved: PropTypes.func,
        /** triggers when user click on refresh button */
        onRefresh: PropTypes.func,
        /** name if the icon class to use as spinner */
        spinner: PropTypes.string
    }

    static defaultProps = {
        refresh: false,
        dismiss: false,
        onRemove: () => {},
        onRemoved: () => {},
        onRefresh: () => {},
        spinner: 'standard'
    }

    /**
     * Helper function to find the closest
     * ascending .card element
     */
    getCardParent(item) {
        var el = item.parentElement;
        while (el && !el.classList.contains('card'))
            el = el.parentElement
        return el
    }

    handleDismiss = e => {
        // find the first parent card
        const card = this.getCardParent(this.element);

        const destroyCard = () => {
            // remove card
            card.parentNode.removeChild(card);
            // An event to catch when the card has been removed from DOM
            this.props.onRemoved();
        }

        const animate = function(item, cb) {
            if ('onanimationend' in window) { // animation supported
                item.addEventListener('animationend', cb.bind(this))
                item.className += ' animated bounceOut'; // requires animate.css
            } else cb.call(this) // no animation, just remove
        }

        const confirmRemove = function() {
            animate(card, function() {
                destroyCard();
            })
        }

        // Trigger the event and finally remove the element
        this.props.onRemove(card, confirmRemove);

    }

    handleRefresh = e => {
        const WHIRL_CLASS = 'whirl';
        const card = this.getCardParent(this.element);

        const showSpinner = function(card, spinner) {
            card.classList.add(WHIRL_CLASS);
            spinner.forEach(function(s) { card.classList.add(s) })
        }

        // method to clear the spinner when done
        const done = () => { card.classList.remove(WHIRL_CLASS); }
        // start showing the spinner
        showSpinner(card, this.props.spinner.split(' '));
        // event to remove spinner when refres is done
        this.props.onRefresh(card, done);
    }

    setRef = node => this.element = node;

    render() {
        return (
            <div ref={this.setRef} className="card-tool float-right">
                { this.props.refresh && <em onClick={this.handleRefresh} className="fas fa-sync"></em> }
                { this.props.dismiss && <em onClick={this.handleDismiss} className="fa fa-times"></em> }
            </div>
        )
    }
}

export default CardTool;
