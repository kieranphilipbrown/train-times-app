import React from 'react';
import PropTypes from 'prop-types'
import { StyledErrorMessage } from './ErrorMessage.styles';
import { ReactComponent as ErrorIcon } from '../../assets/images/error-icon.svg';

const ErrorMessage = ({ showErrorMessage }) => (
    <>
        {
            showErrorMessage &&
            <StyledErrorMessage>
                <ErrorIcon />
                There seems to have been an error. Please try again.
            </StyledErrorMessage>
        }
    </>
);

ErrorMessage.propTypes = {
    showErrorMessage: PropTypes.bool.isRequired,
}

export default ErrorMessage;
