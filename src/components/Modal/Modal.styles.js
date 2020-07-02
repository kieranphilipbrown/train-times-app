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
    right: 10px;
    top: 10px;
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
    z-index: 30;

	@media ${device.tablet} {
		width: 380px;
	}
`;

export const ModalUpper = styled.div `
    padding: 1.5rem 1.5rem 0;
    position: relative;
    text-align: left;

    .train-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        margin-right: 45px;
        margin-top: 0;
    }

    .train-from {
        color: #6e6e6e;
        font-size: 16px;
        display: block;
        margin-bottom: 15px;
        margin-right: 45px;
    }

    .train-status {
        border-radius: .25rem;
        display: inline-block;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 10px;
        padding: .25em .4em;
        text-align: center;
        vertical-align: baseline;
        white-space: nowrap;
    }

    .train-expected {
        margin-bottom: 15px;
    }

    .train-status--green {
        background-color: rgba(10,207,151,.18);
        color: #0acf97;
    }

    .train-status--red {
        background-color: rgba(250,92,124,.18);
        color: #fa5c7c;
    }
`;

export const ModalMiddle = styled.div `
    border-top: 1px solid #f7f8f9;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 10px 1.5rem;
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
