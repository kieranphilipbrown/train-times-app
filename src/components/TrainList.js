import React from 'react';
import PropTypes from 'prop-types';

class TrainList extends React.Component {

    state = {
        trainList: []
    }

    trainListCallback = (e) => {
        const trainButton = e.target.id;
        console.log(e.target.id);
        fetch(`https://transportapi.com/v3/uk/train/station/NLW/live.json?app_id=ba2a7c92&app_key=761d4fbe8af3114e3dc16dedf2b91443&calling_at=NLW&darwin=false&train_status=passenger`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    trainList: myJson
                })
        });
    }

    render() {
        const { title } = this.props;
        const {
            trainList
        } = this.state;
        //console.log(trainList);
        return (
            <>
                <main className="main-content">
                    <p>{title}</p>
                    <ul style={{display: 'flex', justifyContent: 'space-between', listStyleType: 'none'}}>
                        <button style={trainButton} id="Newton" onClick={this.trainListCallback}>Get Newton Trains</button>
                    </ul>

                    <ul style={grid}>
                        <p>Date: {trainList.date}</p>
                        <p>Time: {trainList.time_of_day}</p>
                        <p>Station Name: {trainList.station_name}</p>
                        {trainList.departures.all && trainList.departures.all.length > 0 &&
                        trainList.departures.all.map((train, i) =>
                            <li style={card} key={i}>
                                <h4>{train.operator_name}</h4>
                            </li>
                        )}
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
