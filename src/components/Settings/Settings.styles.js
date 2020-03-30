import styled from 'styled-components';

const size = {
	tablet: '768px',
	desktop: '960px'
}

const device = {
	tablet: `(min-width: ${size.tablet})`,
	desktop: `(min-width: ${size.desktop})`
}

export const StyledSettingsContainer = styled.div`
	background: green;
    width: 100%
`;

export const SettingsContainerLeft = styled.div`
    background: #ffffff;
    height: 100%;
	left: 0;
	max-width: 400px;
	padding: 20px;
	position: absolute;
	text-align: left;
    top: 0;
	-webkit-transition: transform 0.4s ease;
	transition: transform 0.4s ease;
	transform: ${props => props.showSettingsMenu ? "translate(0, 0)" : "translate(-450px, 0)"};
	width: 90%;
	z-index: 9;

	@media ${device.tablet} {
		max-width: 400px;
		width: 400px;
	}

	svg {
		position: absolute;
		right: 15px;
		top: 15px;

		&:hover {
			cursor: pointer;
		}
	}

	h2 {
		margin-bottom: 30px;
	}

	p {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}
`;

export const SettingsContainerRight = styled.div`
	align-items: center;
	background: #0000009a;
	display: flex;
	height: 100%;
	justify-content: center;
	right: 0;
	opacity: ${props => props.showSettingsMenu ? "1" : "0"};
	position: absolute;
	transition: opacity 0.4s ease;
	width: ${props => props.showSettingsMenu ? "100%" : "0"};
	z-index: 8;

	span {
		color: #ffffff;
		display: ${props => props.showSettingsMenu ? "block" : "none"};
	}
`;

export const StationContainer = styled.div`
	border-radius: 5px;
	padding: 20px 0;

	p {
		margin-top: 0;
	}

	input {
		border: 2px solid #c8c8c8;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 10px 20px;
	}
`;

export const SettingsSearchResults = styled.div`
	background: #ffffff;
    border: 2px solid #cecece;
    border-radius: 5px;
    box-sizing: border-box;
    color: #565656;
    font-size: 14px;
    list-style-type: none;
	margin: 0;
	margin-top: -17px;
    max-height: 200px;
    overflow: auto;
    padding-left: 0;
    text-align: left;
    width: 250px;
	z-index: 5;

	li {
		padding: 10px 20px;
	}
`;
