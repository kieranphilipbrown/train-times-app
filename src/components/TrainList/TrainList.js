import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InfoBox from '../InfoBox/InfoBox';
import Card from '../Card/Card';
import { Wrapper } from '../../assets/Styled/Utility/Utility';
import Search from '../Search/Search';
import Settings from '../Settings/Settings';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings-icon.svg';
import { withCookies } from 'react-cookie';

class TrainList extends React.Component {

	state = {
		stationName: '',
		trainList: [],
		stationFrom: '',
		stationTo: '',
		trainFetchError: false,
		isLoading: false,
		showModal: false,
		selectedTrain: {},
		showSettingsMenu: false,
	}

	trainListCallback = (e) => {
		this.setState({
			isLoading: true,
		});
		const trainButton = e.target.id;
		const destination = e.target.dataset.des;
		fetch(`https://transportapi.com/v3/uk/train/station/${trainButton}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${destination}&darwin=true&train_status=passenger`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					stationName: data.station_name,
					trainList: data.departures.all,
					trainFetchError: false,
					isLoading: false,
				})
			}).catch((error) => {
				console.log('Error:', error);
				this.setState({
					trainFetchError: true,
					isLoading: false,
				});
			});
	}

	setSelectedTrain = (selectedTrain) => {
		this.setState({
			selectedTrain: { ...selectedTrain },
			showModal: true,
		})
	}

	toggleModal = (event) => {
		console.log(event);
		this.setState({
			showModal: !this.state.showModal,
		});
	}

	toggleSettingsMenu = () => {
		this.setState({
			showSettingsMenu: !this.state.showSettingsMenu,
		});
	}

	handleFromChange = (event) => {
		this.setState({
			stationFrom: event.target.value,
		});
	}

	handleToChange = (event) => {
		this.setState({
			stationTo: event.target.value,
		});
	}

	searchSubmit = fields => {
		this.setState({
			isLoading: true,
		});
		fetch(`https://transportapi.com/v3/uk/train/station/${fields.stationFromCode}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${fields.stationToCode}&darwin=true&train_status=passenger`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					stationName: data.station_name,
					trainList: data.departures.all,
					trainFetchError: false,
					isLoading: false,
				})
			}).catch((error) => {
				console.log('Error:', error);
				this.setState({
					trainFetchError: true,
					isLoading: false,
				});
			});
	}

	render() {
		const { trainList, stationName, trainFetchError, isLoading, showModal, selectedTrain, showSettingsMenu } = this.state;
		return (
			<>
				<Loader showLoader={isLoading} />
				<Settings showSettingsMenu={showSettingsMenu} toggleSettingsMenu={() => this.toggleSettingsMenu()} />
				<main>
					<ButtonContainer>
						<TrainButton onClick={this.toggleSettingsMenu}>
							<SettingsIcon />
						</TrainButton>
						{
							this.props.cookies.cookies.cookieFromCode && this.props.cookies.cookies.cookieFromCode &&
							<>
								<TrainButton id={this.props.cookies.cookies.cookieFromCode} data-des={this.props.cookies.cookies.cookieToCode} onClick={this.trainListCallback}>
									<span>Out: </span>{this.props.cookies.cookies.cookieFromCode}
								</TrainButton>
								<TrainButton id={this.props.cookies.cookies.cookieToCode} data-des={this.props.cookies.cookies.cookieFromCode} onClick={this.trainListCallback}>
									<span>Return: </span>{this.props.cookies.cookies.cookieToCode}
								</TrainButton>
							</>
						}
					</ButtonContainer>
					<ErrorMessage showErrorMessage={trainFetchError} />
					<Search onSubmit={fields => this.searchSubmit(fields)} />
					<InfoBox station={stationName} />
					<Wrapper>
						<Grid>
							{trainList && trainList.length > 0 && !trainFetchError &&
								trainList.map((train, i) =>
									<Card train={train} key={i} selectedTrain={this.setSelectedTrain} />
								)
							}
						</Grid>
					</Wrapper>
					<Modal { ...selectedTrain } showModal={showModal} toggleModal={this.toggleModal} />
				</main>
			</>
		);
	}
};

const ButtonContainer = styled.div`
	background: #ffffff;
	border-bottom: 1px solid #e9e9e9;
	display: flex;
	justify-content: space-between;
	overflow: auto;
	padding-left: 5%;
	padding-right: 5%;
	padding-bottom: 15px;
	padding-top: 15px;
`;

const TrainButton = styled.button`
	background: #6f2cac;
	border: none;
	border-radius: 5px;
	color: #fff;
	font-family: Comfortaa;
	font-size: 12px;
	margin: 0 5% 0 0;
	min-width: 130px;
	outline: none;
	padding: 10px 15px;
	position: relative;
	transition: background 0.4s ease;

	@include tablet {
		margin: 0;
	}

	&:last-of-type {
		&:after {
			background: white;
			content: '';
			height: 100%;
			margin-left: 10px;
			position: absolute;
			right: -15px;
			top: 0;
			width: 15px;

			@include tablet {
				content: none;
			}
		}
	}

	&:active {
		background: #4a137b;
        transform: scale(0.99);
    }

	&:focus {
		background: #4a137b;
		border-color: #6f2cac;
		box-shadow: 0 0 0 .2rem rgba(111, 44, 172,.25)!important;
	}

	&:hover {
		cursor: pointer;
	}

	svg {
		fill: #ffffff;
		margin-right: 8px;
		margin-top: -3px;
		vertical-align: middle;
		width: 20px;
	}

	span {
		font-size: 12px;
		letter-spacing: 2px;
		text-transform: capitalize;
	}
`;

const Grid = styled.ul`
	display: grid;
	flex-direction: column;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	list-style-type: none;
	margin: 0 auto 40px;
	max-width: 1200px;
	padding-left: 0;
`;

export default withCookies(TrainList);

TrainList.propTypes = {
	title: PropTypes.string,
}
