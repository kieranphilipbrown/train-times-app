import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
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
	}

	trainListCallback = (e) => {
		this.setState({
			isLoading: true,
		});
		const trainButton = e.target.id;
		const destination = e.target.dataset.des;
		setTimeout(()=>{
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
		}, 100);
	}

	toggleModal = (event) => {
		console.log(event)
		this.setState({
			showModal: !this.state.showModal,
		})
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

	handleSubmit = () => {
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
		const { trainList, date, timeOfDay, stationName, trainFetchError, isLoading, showModal } = this.state;
		return (
			<>
				{
					isLoading &&
					<Loader>
						<LoaderIcon height="100" width="100" xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 512.001 512.001" version="1.1" viewBox="0 0 512.001 512.001" xmlSpace="preserve"><path fill="#6f2cac" d="M182.045 343.467c0-19.213-15.631-34.845-34.845-34.845-19.213 0-34.844 15.631-34.844 34.845 0 19.213 15.631 34.844 34.844 34.844 19.214-.002 34.845-15.631 34.845-34.844zm-48.355 0c0-7.45 6.061-13.511 13.51-13.511s13.511 6.061 13.511 13.511c0 7.45-6.062 13.51-13.511 13.51-7.45-.001-13.51-6.062-13.51-13.51zM364.801 378.309c19.213 0 34.844-15.631 34.844-34.844s-15.631-34.845-34.844-34.845-34.844 15.631-34.844 34.845c0 19.215 15.631 34.844 34.844 34.844zm0-48.354c7.45 0 13.51 6.061 13.51 13.511 0 7.45-6.061 13.51-13.51 13.51-7.45 0-13.51-6.061-13.51-13.51-.001-7.45 6.059-13.511 13.51-13.511z"></path><path fill="#6f2cac" d="M467.391 495.195l-52.463-74.554C434.496 411.02 448 390.883 448 367.646V101.685c-.003-32.542-26.479-59.018-59.023-59.018h-58.308V31.999C330.669 14.355 316.315 0 298.67 0h-85.339c-17.645 0-32 14.355-32 31.999v10.668h-58.31c-32.544 0-59.019 26.475-59.022 59.018v265.961c0 23.238 13.504 43.375 33.073 52.996L44.61 495.195c-3.391 4.818-2.234 11.472 2.585 14.862a10.614 10.614 0 006.129 1.945c3.354 0 6.656-1.578 8.733-4.529l26.838-38.139h334.211l26.837 38.139a10.656 10.656 0 008.734 4.529c2.121 0 4.262-.631 6.129-1.945 4.817-3.39 5.975-10.045 2.585-14.862zm-40.724-271.196H266.665v-32.911l78.735-78.735h38.218l-31.66 31.661c-4.166 4.165-4.165 10.919 0 15.085a10.632 10.632 0 007.541 3.124c2.731 0 5.46-1.042 7.543-3.124l46.742-46.746h12.882v111.646zm-160.002-63.082v-48.564h48.564l-48.564 48.564zm-64-128.918c0-5.882 4.785-10.666 10.667-10.666h85.339c5.882 0 10.666 4.784 10.666 10.666v10.668H202.665V31.999zM123.021 64h265.956c17.077 0 31.529 11.419 36.142 27.02H86.879C91.494 75.42 105.944 64 123.021 64zm-37.688 48.353h159.999v32.914l-78.733 78.732h-38.212l31.656-31.657c4.165-4.165 4.165-10.919 0-15.086-4.165-4.165-10.919-4.165-15.086 0l-46.741 46.741H85.333V112.353zm159.999 63.085v48.561h-48.561l48.561-48.561zM85.333 367.646V245.332h17.257l.044.002.044-.002h68.295l.044.002.044-.002h255.607v122.314c0 20.781-16.908 37.688-37.69 37.688H123.021c-20.782-.001-37.688-16.907-37.688-37.688zm18.574 80.352l15.117-21.482c1.322.089 2.652.15 3.997.15h265.956a59.49 59.49 0 004-.151l15.117 21.483H103.907z"></path><path fill="#6f2cac" d="M219.734 293.688h72.532c5.89 0 10.667-4.775 10.667-10.667s-4.776-10.667-10.667-10.667h-72.532c-5.891 0-10.667 4.775-10.667 10.667s4.775 10.667 10.667 10.667zM330.115 165.855l-.554.554c-4.163 4.167-4.16 10.922.007 15.085a10.63 10.63 0 007.538 3.121c2.731 0 5.464-1.043 7.546-3.127l.554-.554c4.164-4.167 4.16-10.922-.006-15.085-4.168-4.165-10.922-4.161-15.085.006zM174.339 173.628c2.731 0 5.46-1.041 7.543-3.124l.554-.554c4.166-4.166 4.166-10.921.001-15.086s-10.919-4.165-15.086 0l-.554.554c-4.165 4.165-4.165 10.919 0 15.086a10.631 10.631 0 007.542 3.124z"></path></LoaderIcon>
						<p>Finding trains...</p>
					</Loader>
				}
				<main className="main-content">
					<div style={buttonContainer}>
						<TrainButton id="NLW" data-des="MCV" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Newton-le-Willows to Victoria</TrainButton>
						<TrainButton id="MCV" data-des="NLW" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Victoria to Newton-le-Willows</TrainButton>
						<TrainButton id="NLW" data-des="MAN" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Newton-le-Willows to Piccadily</TrainButton>
						<TrainButton id="MAN" data-des="NLW" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Piccadily to Newton-le-Willows</TrainButton>
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

					{
						trainFetchError &&
						<div style={pageWidth}>
							<ErrorMessage><ErrorMessageIcon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></ErrorMessageIcon>No results for that search. Please try again.</ErrorMessage>
						</div>
					}

					<div style={pageWidth}>
						<InfoContainer>
							<CardTwo><InfoIcon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/><path d="M0 0h24v24H0z" fill="none"/></InfoIcon><p>{date}</p></CardTwo>
							<CardTwo><InfoIcon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></InfoIcon><p>{timeOfDay}</p></CardTwo>
							<CardTwo><InfoIcon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></InfoIcon><p>From: {stationName}</p></CardTwo>
						</InfoContainer>

						<Grid>
							{trainList && trainList.length > 0 && !trainFetchError &&
								trainList.map((train, i) =>
									<>
										{console.log(train)}
										{
											showModal &&
											<Modal data={train} />
										}
										<div key={i} onClick={this.toggleModal}>
											<li style={card}>
												<div style={cardUpper}>
													<p style={{color: "#464646", fontSize: "18px", fontWeight: "bold", paddingRight: "10px"}}><span style={{color: "#000"}}>{train.expected_arrival_time}</span> {train.destination_name}</p>
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
									</>
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
}

const Loader = styled.div `
	align-items: center;
	background: #f9f9f9e3;
	bottom 0;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
`;

const LoaderIcon = styled.svg `
	-webkit-animation: flickerAnimation 1.5s infinite;
	-moz-animation: flickerAnimation 1.5s infinite;
	-o-animation: flickerAnimation 1.5s infinite;
	animation: flickerAnimation 1.5s infinite;
`;

const pageWidth = {
	margin: "0 auto",
	maxWidth: "1200px",
	paddingLeft: "5%",
	paddingRight: "5%"
}

const InfoIcon = styled.svg`
	fill: #8e8e8e;
	margin-right: 8px;
	margin-top: -3px; 
`;

const ErrorMessage = styled.p`
	align-items: center;
	background: white;
	border-radius: 18px;
	box-shadow: 0 3px 13px -2px rgba(0,0,0,.15);
	display: flex;
    justify-content: center;
	padding: 0.7rem;
	margin-bottom: 0;
`;

const ErrorMessageIcon = styled.svg`
	fill: red;
	margin-right: 8px;
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
	padding: '1rem',
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
