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
    border-right: 1px solid #c8c8c8;
    height: 100%;
	left: 0;
	max-width: 300px;
	padding: 20px;
	position: absolute;
	text-align: left;
    top: 0;
	-webkit-transition: left 0.4s ease;
    transition: left 0.4s ease;
	z-index: 8;
	
	svg {
		position: absolute;
		right: 15px;
		top: 15px;

		&:hover {
			cursor: pointer;
		}
	}
`;

export const SettingsContainerRight = styled.div`
	background: #000;
	height: 100%;
	right: 0;
	opacity: 0.6;
	position: absolute;
	transition: 0.4s ease;
	width: calc(100% - 300px);
	z-index: 8;
`;

export const StationContainer = styled.div`
	border: 1px solid #c8c8c8;
	border-radius: 5px;
	padding: 10px;

	p {
		margin-top: 0;
	}
`;
