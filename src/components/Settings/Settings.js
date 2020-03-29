import React from 'react';
import stations from '../../assets/data/stations.json';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight, StationContainer } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Settings extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    state = {
        settingsStationFrom: '',
        settingsSearchFrom: '',
        stationFromCode: '',
    }

    handleSetStationsSubmit = (e) => {
        e.preventDefault();
        console.log('set stations form submitted');
        console.log(this.state)

        this.props.cookies.set('cookieFromCode', this.state.stationFromCode, { path: '/', maxAge: 2592000 }) // expires in 30 days
    }

    findMatches = (wordToMatch, stations) => {
        // console.log(stations.stations)
        return stations.stations.filter(station => {
            const regex = new RegExp(wordToMatch, 'gi');
            return station.stationName.match(regex) || station.crsCode.match(regex);
        });
    }

    displayMatches = (e, inputType) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        // console.log(e.target.value);
        const matchArray = this.findMatches(e.target.value, stations)
        // console.log(matchArray);

        if (inputType === "from") {
            this.setState({
                settingsSearchFrom: matchArray
            });
        }
    }

    updateFromInputField = e => {
        this.setState({
            settingsStationFrom: e.target.dataset.station,
            stationFromCode: e.target.dataset.code,
            settingsSearchFrom: false
        });
    }

    render() {
        const { showSettingsMenu, toggleSettingsMenu, cookies } = this.props;
        const { settingsSearchFrom } = this.state;
        return (
            <StyledSettingsContainer>
                <SettingsContainerLeft showSettingsMenu={showSettingsMenu}>
                    <SettingsCloseIcon onClick={toggleSettingsMenu} />
                    <h2>Settings Menu</h2>
                    <p>Quick access buttons:</p>
                    <StationContainer>
                        <form onSubmit={(e) => this.handleSetStationsSubmit(e)} autoComplete="off">
                            <div>
                                <label htmlFor="stationFrom">Station to:</label>
                                <input
                                    id={'settingsStationFrom'}
                                    name={'settingsStationFrom'}
                                    type={'text'}
                                    placeholder={'Station Name'}
                                    value={this.state.settingsStationFrom}
                                    onChange={(e) => this.displayMatches(e, "from")}
                                />
                                {
                                    settingsSearchFrom &&
                                    <div>
                                        {
                                            settingsSearchFrom.map((result, i) =>
                                                <li key={i} onClick={(e) => this.updateFromInputField(e, result)} data-station={result.stationName} data-code={result.crsCode}>
                                                    {result.stationName}, {result.crsCode}
                                                </li>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                            <input type="submit" value="Set stations" />
                        </form>
                    </StationContainer>
                </SettingsContainerLeft>
                <SettingsContainerRight onClick={toggleSettingsMenu} showSettingsMenu={showSettingsMenu}>
                    <span>Click to close</span>
                </SettingsContainerRight>
            </StyledSettingsContainer>
        );
    }
}

export default withCookies(Settings);
