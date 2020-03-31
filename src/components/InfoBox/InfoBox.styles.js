import styled from 'styled-components';

export const StyledInfoBox = styled.div `
    background: #ffffff;
    border-bottom: 1px solid #e9e9e9;
    box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
    margin-bottom: 15px;
`;

export const InfoBoxInner = styled.div `
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0;
    padding: 10px 0;

    svg {
        margin-right: 8px;
    }

    span {
        color: #8e8e8e;
    }
`;
