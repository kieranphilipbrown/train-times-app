import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import tpExpress from '../assets/images/tp-express-icon.svg';

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
						<TrainButton id="NLW" data-des="MCV" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Nlw => Vic</TrainButton>
						<TrainButton id="MCV" data-des="NLW" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Vic => Nlw</TrainButton>
						<TrainButton id="NLW" data-des="MAN" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Nlw => Pic</TrainButton>
						<TrainButton id="MAN" data-des="NLW" onClick={this.trainListCallback}><svg style={{width: "20px", verticalAlign: "middle", marginRight: "8px", marginTop: "-3px", fill: "#ffffff"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>Pic => Nlw</TrainButton>
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
										<div style={cardUpper}>
											{console.log(train)}
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
											<p>Arriving at: {train.aimed_arrival_time}</p>
											<p>Departing at: {train.aimed_departure_time}</p>
										</div>
										<div style={cardLower}>
											<span style={{color: '#737B87', fontSize: '12px', display: 'block', fontWeight: 'bold', textAlign: 'left'}}>OPERATOR</span>
											{train.operator === "TP" ? <svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="153 0 149 109"><defs><path id="a" d="M0 107.215645h148.980534V.130422H0z"/></defs><g fill="none" fillRule="evenodd"><path fill="#00A6E6" d="M189.394754 83.609836l-4.28667-6.335977-4.311267 6.335977h-4.208454l6.363468-9.46358-6.258-9.248788h4.312152l4.102101 6.041134 4.07538-6.041134h4.313391l-6.258708 9.19536 6.468582 9.517008z"/><g transform="translate(153 .04947)"><path d="M50.014681 73.375041c1.919658 0 3.076443-.88183 3.076443-2.592963 0-1.737757-1.156785-2.592604-3.076443-2.592604h-3.023886v5.185567h3.023886zm.104937-8.526882c4.312506 0 6.679518 2.56544 6.679518 5.933919 0 3.368478-2.367012 5.907653-6.679518 5.907653h-3.128823v6.870617h-3.707658V64.848159h6.836481zM63.004101 73.375041h3.023356c1.920365 0 3.077327-.88183 3.077327-2.592963 0-1.737757-1.156962-2.592604-3.077327-2.592604H63.0041v5.185567zm6.337278 10.185307l-4.496898-6.870617h-1.84038v6.870617h-3.708365V64.848159h6.837542c4.312506 0 6.678633 2.56544 6.678633 5.933919 0 2.64711-1.44629 4.785127-4.154127 5.560102l4.943721 7.218168H69.34138zM79.332166 80.271723v-4.46384h5.4024l1.181382-3.287707h-6.583782v-4.383788h7.385232l1.182445-3.288247H75.519216V83.56033h11.404162l1.182445-3.288606zM13.088358 80.271723v-4.46384h5.402224l1.180851-3.287707h-6.583075v-4.383788h7.385587l1.181736-3.288247H9.276117V83.56033h11.402924l1.182621-3.288606zM112.550123 72.057818l-.736152-.2666c-1.735266-.669019-2.341176-1.123246-2.341176-2.138736 0-1.069459 1.104582-1.737757 2.314278-1.737757 1.314987 0 2.523975.534639 2.892759 1.496701h3.598297c-.16935-.443434-.459387-1.346671-1.079277-2.167519-1.119623-1.487167-2.973098-2.590805-5.411779-2.590805-3.049899 0-6.021582 1.977733-6.021582 4.99938 0 2.939795 2.182974 4.517268 5.127405 5.48041l.763404.213532c2.182266.74817 3.049899 1.54977 3.049899 2.912811 0 1.630901-1.604139 2.218429-2.892228 2.218429-1.656873 0-3.260658-1.122347-3.760746-2.485928h-.000354l.000354-.00126h-3.501146c.088834.496683.215891.95001.372146 1.364841l.160325.376694c1.10299 2.43286 3.675806 4.007635 6.729421 4.007635 2.576178 0 6.626607-1.658065 6.626607-5.48041 0-2.619768-1.578303-4.704357-5.890455-6.201418M97.407281 72.057818l-.737037-.2666c-1.73562-.669019-2.340114-1.123246-2.340114-2.138736 0-1.069459 1.104051-1.737757 2.314101-1.737757 1.314456 0 2.523975.534639 2.89276 1.496701h3.597588c-.170058-.443434-.458856-1.346671-1.078746-2.167519-1.1198-1.487167-2.973452-2.590805-5.411602-2.590805-3.050607 0-6.021582 1.977733-6.021582 4.99938 0 2.939795 2.182266 4.517268 5.12776 5.48041l.76305.213532c2.181911.74817 3.049544 1.54977 3.049544 2.912811 0 1.630901-1.604316 2.218429-2.892759 2.218429-1.656342 0-3.260835-1.122347-3.75986-2.485928h-.001062l.001061-.00126h-3.502207c.08901.496683.216421.95001.373207 1.364841l.159795.376694c1.10352 2.43286 3.675982 4.007635 6.729066 4.007635 2.576532 0 6.627492-1.658065 6.627492-5.48041 0-2.619768-1.578303-4.704357-5.890455-6.201418" fill="#00A6E6"/><path d="M21.098896 55.53112h1.72217c1.092903 0 1.751724-.502798 1.751724-1.477094 0-.989406-.65882-1.477453-1.751724-1.477453h-1.72217v2.954547zm3.608383 5.800978l-2.560252-3.913551h-1.048132v3.91355h-2.11272V50.673317h3.89488c2.4562 0 3.804279 1.461982 3.804279 3.38071 0 1.507675-.823393 2.724645-2.36719 3.16646l2.816313 4.111612H24.70728zM62.461915 55.53112c1.093433 0 1.752608-.502798 1.752608-1.477094 0-.989406-.659175-1.477453-1.752608-1.477453h-1.722348v2.954547h1.722348zm.059635-4.857804c2.456023 0 3.804809 1.461982 3.804809 3.38071 0 1.91801-1.348786 3.36452-3.804809 3.36452h-1.781983v3.913552H58.62773V50.673316h3.89382z" fill="#1E234F"/><mask id="b" fill="#fff"><use xlinkHref="#a"/></mask><path fill="#1E234F" mask="url(#b)" d="M97.22303 61.332206h2.141212V50.673424h-2.141211zM53.64184 54.79117l-.420633-.152549c-.990443-.380471-1.335514-.640055-1.335514-1.220207 0-.609834.629976-.991925 1.32118-.991925.749425 0 1.439744.305097 1.650503.854488h2.044414c-.111307-.386409-.259245-.715611-.439213-.998041-.000885 0-.001062-.00144-.002124-.0018-.00584-.009893-.011502-.019967-.018227-.030581-.61635-.95109-1.732788-1.685768-3.235352-1.685768-1.74146 0-3.436733 1.130261-3.436733 2.853627 0 1.678752 1.244557 2.578572 2.925496 3.128142l.436029.121967c1.245265.426524 1.740398.88471 1.740398 1.664001 0 .929502-.915766 1.265001-1.650857 1.265001-.945141 0-1.86126-.640595-2.145104-1.418269h-1.97363c.10529.910254.534594 1.46576.672446 1.663102.001238.00108.001238.002878.0023.003958.746947.9975 2.002475 1.612911 3.443988 1.612911 1.470712 0 3.782866-.945512 3.782866-3.126703 0-1.496521-.900724-2.685788-3.362233-3.541354M113.412801 59.459404V56.91645h3.003536l.673154-1.873395h-3.67669v-2.497441h4.191289l.672446-1.872316h-7.03556V61.33208h6.52804l.671562-1.872676zM69.982256 59.459404V56.91645h3.00389l.67227-1.873395h-3.67616v-2.497441h4.190758l.672624-1.872316H67.81043V61.33208h6.527156l.67333-1.872676zM17.31465 50.673334H9.281566l-.684656 1.903257h3.246147v8.755525h2.231992V52.57659h2.555473zM45.535745 50.675798v5.626483l-6.075909-5.757624V61.35005h2.145282v-5.642133l6.075378 5.766438V50.675798zM82.909033 50.675798v5.626483l-6.07644-5.757624V61.35005h2.145636v-5.642133l6.075377 5.766438V50.675798zM93.152995 50.675798v5.626483l-6.076086-5.757624V61.35005h2.145636v-5.642133l6.075024 5.766438V50.675798zM107.366109 50.675798v5.626483l-6.076086-5.757624V61.35005h2.145282v-5.642133l6.075377 5.766438V50.675798z"/><path fill="#00A6E6" mask="url(#b)" d="M135.755333 37.043707l4.539722 10.701776-7.147045-1.59996z"/><path fill="#8F83BD" mask="url(#b)" d="M129.190538 25.346156l12.604126-8.019226-5.987428 16.980727z"/><path d="M118.440595 16.533552c.069723.228103 16.829214 18.406192 16.829214 18.406192l-16.829214-4.992723V16.53355z" fill="#00A6E6" mask="url(#b)"/><path fill="#80CFF4" mask="url(#b)" d="M134.894726 35.59367l-16.45406-3.403198-17.683928 12.888903z"/><path fill="#1E234F" mask="url(#b)" d="M134.894726 35.59367l-34.137988 9.485705h17.683928z"/><path fill="#943F90" mask="url(#b)" d="M134.990638 36.508942l-13.807452 9.782348 4.32047 17.12644z"/><path d="M32.334451 57.066534l.919305-2.435558.919482 2.435558h-1.838787zm3.567152 4.283589h2.320295l-4.968319-10.916388-4.967787 10.916388h2.320117l.99416-2.463801h3.307198l.994336 2.463801z" fill="#1E234F" mask="url(#b)"/></g></g></svg> : null}
											{train.operator === "NT" ?     <svg width="100" height="53" version="1.1" viewBox="0 0 215 53">
      <g fill="#262262">
        <path
          d="M197.13 304.993c0-11.539-9.354-20.893-20.893-20.893-11.54 0-20.895 9.354-20.895 20.893 0 11.54 9.355 20.894 20.895 20.894 11.539 0 20.893-9.354 20.893-20.894m-10.655-8.821v11.284c0 5.63-4.58 10.21-10.21 10.21-5.63 0-10.21-4.58-10.21-10.21v-11.284a1.343 1.343 0 112.687 0v11.284c0 4.148 3.376 7.524 7.524 7.524s7.523-3.376 7.523-7.524v-11.284a1.342 1.342 0 112.686 0M210.296 312.708a6.978 6.978 0 01-6.97-6.97v-7.282a1.248 1.248 0 012.496 0v7.282a4.479 4.479 0 004.474 4.473 4.478 4.478 0 004.473-4.473v-7.282a1.248 1.248 0 112.497 0v7.282c0 3.843-3.128 6.97-6.97 6.97M319.57 312.636c-3.843 0-6.97-3.127-6.97-6.97v-7.282a1.248 1.248 0 112.497 0v7.281a4.479 4.479 0 004.473 4.473 4.478 4.478 0 004.474-4.473v-7.281a1.249 1.249 0 012.498 0v7.281c0 3.844-3.129 6.97-6.972 6.97M245.217 312.757a6.979 6.979 0 01-6.97-6.97v-7.282a1.25 1.25 0 012.496 0v7.281a4.478 4.478 0 004.474 4.473 1.248 1.248 0 010 2.498M308.135 312.687a6.977 6.977 0 01-6.97-6.97v-7.281a1.248 1.248 0 112.496 0v7.281a4.479 4.479 0 004.474 4.472 1.248 1.248 0 110 2.498M258.978 299.7a4.48 4.48 0 00-4.474 4.474v6.051h3.653a1.25 1.25 0 110 2.497h-3.653v5.466a1.248 1.248 0 11-2.496 0v-5.466h-1.826a1.249 1.249 0 110-2.497h1.826v-6.05a6.977 6.977 0 016.97-6.971 1.25 1.25 0 110 2.497M270.817 312.782a6.939 6.939 0 01-4.474-1.63v6.74a1.248 1.248 0 11-2.496 0v-19.458a1.249 1.249 0 112.496 0v7.378a4.478 4.478 0 004.474 4.473 4.478 4.478 0 004.47-4.473v-7.379a1.248 1.248 0 112.498 0v7.38c0 3.843-3.128 6.97-6.968 6.97M227.461 312.724c-4.393 0-7.967-3.48-7.967-7.757 0-4.277 3.574-7.756 7.967-7.756s7.965 3.48 7.965 7.756c0 4.277-3.572 7.757-7.965 7.757m0-13.016c-3.017 0-5.471 2.358-5.471 5.259 0 2.9 2.454 5.26 5.471 5.26 3.015 0 5.47-2.36 5.47-5.26s-2.455-5.26-5.47-5.26M289.807 312.705c-4.392 0-7.966-3.496-7.966-7.794 0-4.126 3.296-7.544 7.501-7.78l.072-.001a1.248 1.248 0 01.067 2.494c-2.382.133-4.34 1.743-4.948 3.881h11.991a1.247 1.247 0 011.244 1.326.7.7 0 01.004.08c0 4.298-3.573 7.794-7.965 7.794m0-2.497c2.63 0 4.83-1.807 5.352-4.207h-10.706c.522 2.4 2.724 4.207 5.354 4.207"
          transform="translate(0 -997.596) matrix(1.25 0 0 -1.25 -193.653 1404.955)"
        ></path>
      </g>
    </svg> : null}
										</div>
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
	display: 'flex',
	flexDirection: 'column',
}

const cardUpper = {
	padding: '1.5rem'
}

const cardLower = {
	alignItems: 'center',
	background: '#F7F8F9',
	borderBottomLeftRadius: '18px',
	borderBottomRightRadius: '18px',
	display: 'flex',
	justifyContent: 'space-between',
	marginTop: 'auto',
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
`

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
