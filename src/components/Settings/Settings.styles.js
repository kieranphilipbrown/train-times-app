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
	width: 400px;
	z-index: 8;

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
`;

export const SettingsContainerRight = styled.div`
	background: #000;
	height: 100%;
	right: 0;
	opacity: 0.6;
	position: absolute;
	transition: 0.4s ease;
	width: ${props => props.showSettingsMenu ? "calc(100% - 400px)" : "0"};
	z-index: 8;
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
