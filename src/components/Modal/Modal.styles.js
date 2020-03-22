import styled from 'styled-components';

const size = {
	tablet: '768px',
	desktop: '960px'
}

const device = {
	tablet: `(min-width: ${size.tablet})`,
	desktop: `(min-width: ${size.desktop})`
}

export const StyledModal = styled.div `
    align-items: center;
    background: #f6f2edb8;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

export const ModalClose = styled.button `
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    display: flex;
    height: 48px;
    justify-content: center;
    position: absolute;
    right: 1.3rem;
    top: 1.3rem;
    width: 48px;
`;

export const ModalInner = styled.div `
	background: #ffffff;
	border-radius: 18px;
	box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
	display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 380px;
    min-height: 200px;
    position: relative;
    width: 92%;

	@media ${device.tablet} {
		width: 380px;
	}
`;

export const ModalUpper = styled.div `
    padding: 1.5rem;
    text-align: left;
`;

export const ModalMiddle = styled.div `
    border-top: 1px solid #f7f8f9;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 0.4rem 1.5rem;
`;

export const ModalLower = styled.div `
    align-items: center;
    background: #F7F8F9;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    display: flex;
    justify-content: space-between;
    min-height: 70px;
    padding: 0 1.5rem;
`;
