import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InfoBox from '../InfoBox/InfoBox';
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
		const { trainList, date, timeOfDay, stationName, trainFetchError, isLoading, showModal, selectedTrain } = this.state;
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
									<div key={i} onClick={() => this.setSelectedTrain(train)}>
										<li style={card}>
											<div style={cardUpper}>
												<p style={{color: "#464646", fontSize: "18px", fontWeight: "bold", marginTop: "0", paddingRight: "10px"}}><span style={{color: "#000"}}>{train.expected_arrival_time}</span> {train.destination_name}</p>
												<p style={{color: "#6e6e6e", fontSize: "14px"}}> From: {train.origin_name}</p>
												{
													train.status === "LATE" || train.status === "CANCELLED"
													?
													<span style={{fontSize: "14px", color: "#a93a10"}}>
														{train.status.toLowerCase()}
													</span>
													:
													<span style={{fontSize: "14px", color: "#4ac721"}}>
														{train.status.toLowerCase()}
													</span>
												}
											</div>
										</li>
									</div>
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

const InfoIcon = styled.svg`
	fill: #8e8e8e;
	margin-right: 8px;
	margin-top: -3px;
`;

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
	transition: 0.4s ease;

	&:focus {
		border-color: #6f2cac;
		box-shadow: 0 0 0 .2rem rgba(111, 44, 172,.25)!important;
	}

	&:hover {
		cursor: pointer;
	}
`;
const SearchContainer = styled.div`
	background: white;
	border-bottom: 1px solid #cecece;
	padding: 15px 0;
`;

const SearchForm = styled.form`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media ${device.tablet} {
		align-items: center;
		flex-direction: row;
	}
`;

const SearchInput = styled.input`
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

const SearchLabel = styled.label`
	margin-bottom: 5px;

	@media ${device.tablet} {
		margin-bottom: 0;
	}
`;

const SearchButton = styled.button`
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

const InfoContainer = styled.div`
	display: block;
	list-style-type: none;
	margin: 0 auto;
	max-width: 1200px;
	padding: 20px 0 0;

	@media ${device.tablet} {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
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

const card = {
	background: '#fff',
	borderRadius: '18px',
	boxShadow: "0 3px 13px -2px rgba(0,0,0,.15)",
	display: 'flex',
	flexDirection: 'column',
}

const cardUpper = {
	padding: '1.3rem',
	textAlign: 'left',
}

const cardMiddle = {
	borderTop: '1px solid #f7f8f9',
	display: 'flex',
	justifyContent: 'space-between',
	marginTop: 'auto',
	padding: '0.4rem 1.5rem',
}

const cardLower = {
	alignItems: 'center',
	background: '#F7F8F9',
	borderBottomLeftRadius: '18px',
	borderBottomRightRadius: '18px',
	display: 'flex',
	justifyContent: 'space-between',
	minHeight: '70px',
	padding: '0 1.5rem'
}

const CardTwo = styled.div`
	align-items: center;
	background: #fff;
	border-radius: 18px;
	display: flex;
	box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
	margin-bottom: 15px;
	min-width: 220px;
	padding: 0.5rem;

	&:nth-child(2) {
		margin-left: 0;
		margin-right: 0;

		@media ${device.tablet} {
			margin-left: 15px;
			margin-right: 15px;
		}
	}

	&:nth-child(3) {
		flex: 1;
	}

	@media ${device.tablet} {
		margin-bottom: 0;
		padding: 0.3rem 1.5rem;
	}
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
