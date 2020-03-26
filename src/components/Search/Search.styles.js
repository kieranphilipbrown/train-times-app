import styled from 'styled-components';

const size = {
	tablet: '768px',
	desktop: '960px'
}

const device = {
	tablet: `(min-width: ${size.tablet})`,
	desktop: `(min-width: ${size.desktop})`
}

export const SearchContainer = styled.div`
	background: white;
	border-bottom: 1px solid #cecece;
	padding: 15px 0;
`;

export const SearchForm = styled.form`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
    justify-content: center;

	@media ${device.tablet} {
		align-items: center;
		flex-direction: row;
	}
`;

export const SearchInput = styled.input`
	border: 2px solid #cecece;
	border-radius: 5px;
	font-family: Comfortaa, sans-serif;
	margin: 0 0 15px;
	outline: none;
	padding: 10px 18px;
    transition: 0.4s ease;

	&:focus {
		border-color: #6f2cac;
		box-shadow: 0 0 0 .2rem rgba(111, 44, 172,.25)!important;
    }

	@media ${device.tablet} {
		margin: 0 10px;
	}
`;

export const SearchLabel = styled.label`
    margin-bottom: 5px;

	@media ${device.tablet} {
		margin-bottom: 0;
	}
`;

export const SearchButton = styled.button`
	border: 2px solid #cecece;
	border-radius: 5px;
	font-family: 'Comfortaa', sans-serif;
	margin: 0 0 10px;
	outline: none;
	padding: 10px 18px;
    transition: 0.4s ease;

	&:hover {
		background: #6f2cac;
		color: #fff;
		cursor: pointer;
    }

	&:focus {
		border-color: #6f2cac;
		box-shadow: 0 0 0 .2rem rgba(111, 44, 172,.25)!important;
    }

	@media ${device.tablet} {
		margin-bottom: 0;
	}
`;

export const SearchInputContainer = styled.div`
    position: relative;
`;

export const SearchInputResult = styled.ul`
    background: #ffffff;
    border: 2px solid #cecece;
    border-radius: 5px;
    box-sizing: border-box;
    color: #565656;
    font-size: 14px;
    left: 0;
    list-style-type: none;
    margin: 0 10px;
    max-height: 200px;
    overflow: auto;
    padding-left: 0;
    position: absolute;
    text-align: left;
    top: 40px;
    width: 250px;
    z-index: 5;

    li {
        padding: 10px 20px;

        &:hover {
            background: #f6f2ed;
            cursor: pointer;
        }
    }
`;
