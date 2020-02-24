import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class TrainList extends React.Component {

	state = {
		date: '',
		timeOfDay: '',
		stationName: '',
		trainList: [],
		stationFrom: '',
		stationTo: '',
		trainFetchError: false
	}

	trainListCallback = (e) => {
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
				})
			}).catch((error) => {
				console.log('Error:', error);
				this.setState({
					trainFetchError: true,
				});
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

	handleSubmit = (event) => {
		event.preventDefault();
		//console.log(`${this.state.stationFrom} ${this.state.stationTo}`);

		const stationFrom = this.state.stationFrom;
		const stationTo = this.state.stationTo;

		fetch(`https://transportapi.com/v3/uk/train/station/${stationFrom}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${stationTo}&darwin=true&train_status=passenger`)
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
				})
			}).catch((error) => {
				console.log('Error:', error);
				this.setState({
					trainFetchError: true,
				});
			});
	}

	render() {
		const { trainList, date, timeOfDay, stationName, trainFetchError } = this.state;
		return (
			<>
				<main className="main-content">
					<div style={buttonContainer}>
						<TrainButtonContainer>
							<TrainButton id="NLW" data-des="MCV" onClick={this.trainListCallback}>Nlw => Mcv</TrainButton>
						</TrainButtonContainer>
						<TrainButtonContainer>
							<TrainButton id="MCV" data-des="NLW" onClick={this.trainListCallback}>Mcv => Nlw</TrainButton>
						</TrainButtonContainer>
						<TrainButtonContainer>
							<TrainButton id="NLW" data-des="MAN" onClick={this.trainListCallback}>Nlw => Man</TrainButton>
						</TrainButtonContainer>
						<TrainButtonContainer>
							<TrainButton id="MAN" data-des="NLW" onClick={this.trainListCallback}>Man => Nlw</TrainButton>
						</TrainButtonContainer>
					</div>

					<SearchContainer>
						<div style={pageWidth}>
							<SearchForm onSubmit={this.handleSubmit}>
								<SearchLabel htmlFor="stationfrom">Where from?</SearchLabel>
								<SearchInput id="stationfrom" type="text" placeholder="Station Name" value={this.state.stationFrom} onChange={this.handleFromChange} />

								<SearchLabel htmlFor="stationto">Where to?</SearchLabel>
								<SearchInput id="stationto" type="text" placeholder="Station Name" value={this.state.stationTo} onChange={this.handleToChange} />
								<SearchButton>Search</SearchButton>
							</SearchForm>
						</div>
					</SearchContainer>

					{ trainFetchError &&
						<div style={pageWidth}>
							<ErrorMessage><ErrorMessageIcon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></ErrorMessageIcon>No results for that search. Please try again.</ErrorMessage>
						</div>
					}

					<div style={pageWidth}>
						<InfoContainer>
							<CardTwo><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/><path d="M0 0h24v24H0z" fill="none"/></svg><p>{date}</p></CardTwo>
							<CardTwo><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg><p>{timeOfDay}</p></CardTwo>
							<CardTwo><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg><p>From: {stationName}</p></CardTwo>
						</InfoContainer>

						<Grid>
							{trainList && trainList.length > 0 && !trainFetchError &&
								trainList.map((train, i) =>
									<li style={card} key={i}>
										{/* {console.log(train)} */}
										<p>Train to: <span style={{fontWeight: "bold"}}>{train.destination_name}</span></p>
										<p style={{fontSize: "14px", display: "block", marginBottom: "15px"}}>From: {train.origin_name}</p>
										{
											train.status === "LATE"
											?
											<span style={{fontSize: "14px", background: "#ff5656", border: "1px solid #e62525", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>
												{train.status}: Expected {train.expected_arrival_time}
											</span>
											:
											<span style={{fontSize: "14px", background: "#59e32c", border: "1px solid #48c220", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>
												{train.status}: Expected {train.expected_arrival_time}
											</span>
										}
										<p>Operator: {train.operator_name}</p>
										<p>Arriving at: {train.aimed_arrival_time}</p>
										<p>Departing at: {train.aimed_departure_time}</p>
									</li>
								)
							}
						</Grid>
					</div>

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
};

const pageWidth = {
	paddingLeft: "5%",
	paddingRight: "5%"
}

const ErrorMessage = styled.p`
	align-items: center;
	background: white;
	border-radius: 18px;
	box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
	display: flex;
    justify-content: center;
	padding: 0.7rem;
	margin-bottom: 0;
}
`;

const ErrorMessageIcon = styled.svg`
	fill: red;
	margin-right: 8px;
}
`;

const TrainButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const TrainButton = styled.button`
	background: #6f2cac;
	border: none;
	border-radius: 5px;
	color: #fff;
	font-family: Comfortaa;
	font-size: 12px;
	outline: none;
	padding: 10px 15px;
	transition: 0.4s ease;

	&:focus {
		border-color: #6f2cac;
		box-shadow: 0 0 0 .2rem rgba(111, 44, 172,.25)!important;
	}
`
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
	margin: 0 0 10px;
	outline: none;
	padding: 10px 18px;
	transition: 0.4s ease;

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

	@media ${device.tablet} {
		flex-direction: row;
		grid-gap: 40px;
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const card = {
	background: '#fff',
	borderRadius: '18px',
	boxShadow: "0 3px 13px -2px rgba(0,0,0,.15)",
	padding: '1.5rem'
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
`

const buttonContainer = {
	background: "white",
	borderBottom: "1px solid #cecece",
	display: "flex",
	justifyContent: "center",
	paddingLeft: "5%",
	paddingRight: "5%",
}

export default TrainList;

TrainList.propTypes = {
	title: PropTypes.string,
}
