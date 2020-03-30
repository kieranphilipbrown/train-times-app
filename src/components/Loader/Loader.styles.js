import styled from 'styled-components';

export const StyledLoader = styled.div `
	align-items: center;
	background: #f9f9f9e3;
	bottom 0;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 10;

    svg {
        -webkit-animation: flickerAnimation 1.5s infinite;
        -moz-animation: flickerAnimation 1.5s infinite;
        -o-animation: flickerAnimation 1.5s infinite;
		animation: flickerAnimation 1.5s infinite;
		margin-bottom: 15px;
    }
`;
