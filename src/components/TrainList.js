import React from 'react';
import PropTypes from 'prop-types';

class TrainList extends React.Component {

	state = {
		date: '',
		timeOfDay: '',
		stationName: '',
		trainList: []
	}

	trainListCallback = (e) => {
		const trainButton = e.target.id;
		const destination = e.target.dataset.des;

		//fetch(`https://transportapi.com/v3/uk/train/station/${trainButton}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${trainButton}&darwin=false&train_status=passenger`)
		fetch(`https://transportapi.com/v3/uk/train/station/${trainButton}/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=${destination}&darwin=false&train_status=passenger`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					date: data.date,
					timeOfDay: data.time_of_day,
					stationName: data.station_name,
					trainList: data.departures.all
				})
			});
	}

	render() {
		const { trainList, date, timeOfDay, stationName } = this.state;

		return (
			<>
				<main className="main-content">
					<div style={buttonContainer}>
						<ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none', paddingLeft: "0" }}>
							<button style={trainButton} id="NLW" data-des="MCV" onClick={this.trainListCallback}>Nlw to Mcv</button>
						</ul>
						<ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
							<button style={trainButton} id="MCV" data-des="NLW" onClick={this.trainListCallback}>Mcv to Nlw</button>
						</ul>
						<ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
							<button style={trainButton} id="NLW" data-des="LIV" onClick={this.trainListCallback}>Nlw to Liv</button>
						</ul>
					</div>

					<div style={{ margin: "0 auto", maxWidth: "1200px", padding: "20px 0", display: 'flex', justifyContent: 'space-between', listStyleType: 'none', paddingLeft: "0"}}>
						<div style={cardTwo}><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/><path d="M0 0h24v24H0z" fill="none"/></svg> <p>Date: {date}</p></div>
						<div style={cardTwo}><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>  <p>Time: {timeOfDay}</p></div>
						<div style={cardTwo}><svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>  <p>Station Name: {stationName}</p></div>
					</div>

					<ul style={grid}>
						{trainList && trainList.length > 0 &&
							trainList.map((train, i) =>
								<li style={card} key={i}>
									{console.log(train)}
									<p>Train to: <span style={{fontWeight: "bold"}}>{train.destination_name}</span></p>
									<p style={{fontSize: "12px", display: "block", marginBottom: "15px"}}>From: {train.origin_name}</p>
									<span style={{fontSize: "12px", background: "#59e32c", border: "1px solid #48c220", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>{train.status}</span>
									<p>Operator: {train.operator_name}</p>
									<p>Arriving at: <span style={{background: "#59e32c", border: "1px solid #48c220", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>{train.aimed_arrival_time}</span></p>
									<p>Departing at: {train.aimed_departure_time}</p>
									<p>Platform: {train.platform}</p>
								</li>
							)
						}
					</ul>

				</main>
			</>
		);
	}
};

const pageWidth = {
	paddingLeft: "5%",
	paddingRight: "5%"
}

const trainButton = {
	background: '#6f2cac',
	border: "none",
	borderRadius: "4px",
	color: "#fff",
	fontFamily: 'Comfortaa',
	padding: "10px 15px",
}

const grid = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	gridGap: '40px',
	listStyleType: 'none',
	margin: "0 auto 40px",
	maxWidth: "1200px",
	paddingLeft: "0"
}

const card = {
	background: '#fff',
	borderRadius: '18px',
	boxShadow: "0 3px 13px -2px rgba(0,0,0,.15)",
	padding: '1.5rem'
}

const cardTwo = {
	alignItems: "center",
	background: '#fff',
	borderRadius: '18px',
	display: "flex",
	boxShadow: "0 3px 13px -2px rgba(0,0,0,.15)",
	padding: '1.5rem'
}

const buttonContainer = {
	background: "white",
	borderBottom: "1px solid #cecece",
	display: "flex",
	justifyContent: "center"
}

export default TrainList;

TrainList.propTypes = {
	title: PropTypes.string,
}
