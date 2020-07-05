import styled from 'styled-components';

export const StyledResult = styled.div `
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const ResultInner = styled.div `
    padding: 20px;
    text-align: left;


    .result {
        color: #5a5a5a;
        font-weight: bold;
        margin-bottom: 15px;

        span {
            color: #acacac;
            font-weight: normal;
        }
    }
`;
