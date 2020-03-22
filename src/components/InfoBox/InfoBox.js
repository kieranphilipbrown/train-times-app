import React from 'react';

import { ReactComponent as TrainIcon } from '../../assets/images/train-icon.svg';
import { StyledInfoBox, InfoBoxInner } from './InfoBox.styles';
import { Wrapper } from '../../assets/Styled/Utility/Utility';

const InfoBox = ({ station }) => (
    <StyledInfoBox>
        <Wrapper>
            <InfoBoxInner>
                <TrainIcon /><p><span>From:</span> {station}</p>
            </InfoBoxInner>
        </Wrapper>
    </StyledInfoBox>
);

export default InfoBox;
