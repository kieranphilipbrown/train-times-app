import React from 'react';

import { ReactComponent as ErrorIcon } from '../../assets/images/error-icon.svg';
import { StyledErrorMessage } from './ErrorMessage.styles';

const ErrorMessage = ({ showErrorMessage }) => (
    <>
        {
            showErrorMessage &&
            <StyledErrorMessage>
                <ErrorIcon />
                No results for that search. Please try again.
            </StyledErrorMessage>
        }
    </>
);

export default ErrorMessage;
