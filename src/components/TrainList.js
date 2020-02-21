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
		console.log(e.target.id);
		fetch(`https://transportapi.com/v3/uk/train/station/NLW/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=NLW&darwin=false&train_status=passenger`)
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
		const { title } = this.props;
		const { trainList, date, timeOfDay, stationName } = this.state;

		return (
			<>
				<main className="main-content">
					<p>{title}</p>
					<ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
						<button style={trainButton} id="Newton" onClick={this.trainListCallback}>Get Newton Trains</button>
					</ul>

					<ul style={grid}>
						<p>Date: {date}</p>
						<p>Time: {timeOfDay}</p>
						<p>Station Name: {stationName}</p>
						{trainList && trainList.length > 0 &&
							trainList.map((train, i) =>
								<li style={card} key={i}>

									{console.log(train)}
									<h4>Train to: {train.destination_name}</h4>
									<p>Arriving at: {train.aimed_arrival_time}</p>
									<p>Departing at: {train.aimed_departure_time}</p>
								</li>
							)
						}
					</ul>

				</main>
			</>
		);
	}
};

const trainButton = {
	background: 'transparent',
	border: '1px solid #333'
}

const grid = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	gridGap: '40px',
	listStyleType: 'none'
}

const card = {
	border: '1px solid #333',
	borderRadius: '5px',
	padding: '1.5rem'
}

export default TrainList;

TrainList.propTypes = {
	title: PropTypes.string,
}
