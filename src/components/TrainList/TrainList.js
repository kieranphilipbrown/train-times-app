import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InfoBox from '../InfoBox/InfoBox';
import Card from '../Card/Card';
import { Wrapper } from '../../assets/Styled/Utility/Utility';

const buttonData = [
	{
		id: 'NLW',
		destination: 'MCV',
		label: 'Newton-le-Willows to Victoria',
	},
	{
		id: 'MCV',
		destination: 'NLW',
		label: 'Victoria to Newton-le-Willows',
	},
	{
		id: 'NLW',
		destination: 'MAN',
		label: 'Newton-le-Willows to Piccadilly',
	},
	{
		id: 'MAN',
		destination: 'NLW',
		label: 'Picadilly to Newton-le-Willows',
	},
];

class TrainList extends React.Component {

	state = {
		date: '',
		timeOfDay: '',
		stationName: '',
		trainList: [],
		stationFrom: '',
		stationTo: '',
		trainFetchError: false,
		isLoading: false,
		showModal: false,
		selectedTrain: {},
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
					date: data.date,
					timeOfDay: data.time_of_day,
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

	// handleSubmit = () => {
	// 	//console.log(`${this.state.stationFrom} ${this.state.stationTo}`);

	// 	const stationFrom = this.state.stationFrom;
	// 	const stationTo = this.state.stationTo;

	// 	fetch(`https://transportapi.com/v3/uk/train/station/${stationFrom}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${stationTo}&darwin=true&train_status=passenger`)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			this.setState({
	// 				date: data.date,
	// 				timeOfDay: data.time_of_day,
	// 				stationName: data.station_name,
	// 				trainList: data.departures.all,
	// 				trainFetchError: false,
	// 			})
	// 		}).catch((error) => {
	// 			console.log('Error:', error);
	// 			this.setState({
	// 				trainFetchError: true,
	// 			});
	// 		});
	// }

	render() {
		const { trainList, stationName, trainFetchError, isLoading, showModal, selectedTrain } = this.state;
		return (
			<>
				<Loader showLoader={isLoading} />
				<main>
					<div style={buttonContainer}>
						{
							buttonData.map((button, i) =>
								<TrainButton key={`${button.id}-${i}`} id={button.id} data-des={button.destination} onClick={this.trainListCallback}>
									<svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>
									{button.label}
								</TrainButton>
							)
						}
					</div>

					{/* <SearchContainer>
						<div style={pageWidth}>
							<SearchForm onSubmit={this.handleSubmit}>
								<SearchLabel htmlFor="stationfrom">Where from?</SearchLabel>
								<SearchInput id="stationfrom" type="text" placeholder="Station Name" value={this.state.stationFrom} onChange={this.handleFromChange} />

								<SearchLabel htmlFor="stationto">Where to?</SearchLabel>
								<SearchInput id="stationto" type="text" placeholder="Station Name" value={this.state.stationTo} onChange={this.handleToChange} />
								<SearchButton>Search</SearchButton>
							</SearchForm>
						</div>
					</SearchContainer> */}

					<ErrorMessage showErrorMessage={trainFetchError} />
					<InfoBox station={stationName} />
					<Wrapper>
						<Grid>
							{trainList && trainList.length > 0 && !trainFetchError &&
								trainList.map((train, i) =>
									<Card train={train} key={i} onClick={() => this.setSelectedTrain(train)} />
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

const size = {
	tablet: '768px',
	desktop: '960px'
}

const device = {
	tablet: `(min-width: ${size.tablet})`,
	desktop: `(min-width: ${size.desktop})`
}

const TrainButton = styled.button`
	background: #6f2cac;
	border: none;
	border-radius: 5px;
	color: #fff;
	font-family: Comfortaa;
	font-size: 12px;
	margin: 0 10px;
	min-width: 130px;
	outline: none;
	padding: 10px 15px;
	transition: background 0.4s ease;

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

const buttonContainer = {
	background: "white",
	borderBottom: "1px solid #cecece",
	display: "flex",
	justifyContent: "space-between",
	overflow: "auto",
	paddingLeft: "5%",
	paddingRight: "5%",
	paddingBottom: "20px",
	paddingTop: "20px",
}

export default TrainList;

TrainList.propTypes = {
	title: PropTypes.string,
}
