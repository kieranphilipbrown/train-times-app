import React from 'react';

import { ReactComponent as LoaderIcon } from '../../assets/images/loader-icon.svg';
import { StyledLoader } from './Loader.styles';

const Loader = ({ showLoader }) => (
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

export default Loader;
