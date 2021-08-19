import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';

import FormWizardValidation from './FormWizard.Validation.js';
import FormWizardVertical from './FormWizard.Vertical.js';

class FormWizard extends Component {
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>
                        Form Wizard
                        <small>Native form wizard with validation powered by Reactstrap</small>
                    </div>
                </div>

                <FormWizardValidation />

                <FormWizardVertical />
            </ContentWrapper>
        );
    }
}

export default FormWizard;
