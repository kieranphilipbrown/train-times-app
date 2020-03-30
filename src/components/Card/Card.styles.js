import styled from 'styled-components';

export const StyledCard = styled.div `
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
    display: flex;
    flex-direction: column;
    position: relative;

    &:active {
        transform: scale(0.99);
    }

    &:hover {
        background: #ffffff85;
        cursor: pointer;
    }

    .right-arrow {
        fill: #dbdbdb;
        height: 50px;
        position: absolute;
        right: 0;
        top: 36px;
        width: 50px;
    }

    .more-info {
        font-size: 14px;
        text-decoration: underline;
        margin-bottom: 0;
    }
`;

export const CardInner = styled.div `
    padding: 1.3rem;
    text-align: left;

    .train-title {
        color: #3e3e3e;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 0;
        padding-right: 20px;

        svg {
            vertical-align: middle;
            fill: #d3d3d3;
            height: 24px;
            width: 24px;
            margin-right: 8px;
            margin-top: -6px;
        }
    }

    .train-time {
        color: #333333;
        display: inline-block;
        margin-right: 10px;
    }

    .train-from {
        margin-bottom: 10px;
    }

    .train-status {
        display: block;
        font-size: 14px;
        margin-bottom: 10px;
        text-transform: capitalize;
    }

    .train-status--green {
        color: #2e8212;
    }

    .train-status--red {
        color: #a93a10;
    }
`;
