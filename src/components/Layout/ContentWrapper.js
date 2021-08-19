import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper element for template content
 */
const ContentWrapper = props =>(
    <div className="content-wrapper">
        {props.unwrap ?
            (<div className="unwrap">{props.children}</div>)
            :
            (props.children)
        }
    </div>
)

ContentWrapper.propTypes = {
    /** add element with 'unwrap' class to expand content area */
    unwrap: PropTypes.bool
}
ContentWrapper.defaultProps = {
    unwrap: false
}

export default ContentWrapper;
