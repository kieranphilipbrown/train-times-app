import React from 'react';
import PropTypes from 'prop-types'
import { StyledLoader } from './Loader.styles';
import { ReactComponent as LoaderIcon } from '../../assets/images/loader-icon.svg';

const Loader = ({ showLoader = false }) => (
    <>
        {
            showLoader &&
            <StyledLoader>
                <LoaderIcon />
                <p>Finding trains...</p>
            </StyledLoader>
        }
    </>
);

Loader.propTypes = {
    showLoader: PropTypes.bool.isRequired,
}

export default Loader;
