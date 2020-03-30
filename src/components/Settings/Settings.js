import React from 'react';
import stations from '../../assets/data/stations.json';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight, StationContainer } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';
import { withCookies, Cookies } from 'react-cookie';

class Settings extends React.Component {

    state = {
        settingsStationFrom: '',
        settingsSearchFrom: '',
        stationFromCode: '',
        settingsStationTo: '',
        settingsSearchTo: '',
        stationToCode: '',
        cookieFrom: '',
        cookieTo: '',
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

        if (inputType === "to") {
            this.setState({
                settingsSearchTo: matchArray
            });
        }

        if (e.target.value < 1 || matchArray < 1) {
            // console.log("less than 1 character");
            this.setState({
                settingsSearchFrom: false,
                settingsSearchTo: false,
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

    updateToInputField = e => {
        this.setState({
            settingsStationTo: e.target.dataset.station,
            stationToCode: e.target.dataset.code,
            settingsSearchTo: false
        });
    }

    handleSetStationsSubmit = (e) => {
        e.preventDefault();
        this.props.cookies.set('cookieFromCode', this.state.stationFromCode, { path: '/', maxAge: 2592000 }) // expires in 30 days
        this.props.cookies.set('cookieToCode', this.state.stationToCode, { path: '/', maxAge: 2592000 }) // expires in 30 days
    }

    render() {
        const { showSettingsMenu, toggleSettingsMenu } = this.props;
        const { settingsSearchFrom, settingsSearchTo } = this.state;
        return (
            <StyledSettingsContainer>
                <SettingsContainerLeft showSettingsMenu={showSettingsMenu}>
                    <SettingsCloseIcon onClick={toggleSettingsMenu} />
                    <h2>Settings Menu</h2>
                    <p>Quick access buttons:</p>
                    <StationContainer>
                        <form onSubmit={(e) => this.handleSetStationsSubmit(e)} autoComplete="off">
                            {/* From input */}
                            <div>
                                <label htmlFor="stationFrom">Station from:</label>
                                <input
                                    id={'settingsStationFrom'}
                                    name={'settingsStationFrom'}
                                    type={'text'}
                                    placeholder={this.props.cookies.cookies.cookieFromCode}
                                    value={this.state.settingsStationFrom}
                                    onChange={(e) => this.displayMatches(e, "from")}
                                />
                                {
                                    settingsSearchFrom &&
                                    <div style={{background: "#f9f9f9", padding: "5px"}}>
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
                            {/* To input */}
                            <div>
                                <label htmlFor="stationFrom">Station to:</label>
                                <input
                                    id={'settingsStationTo'}
                                    name={'settingsStationTo'}
                                    type={'text'}
                                    placeholder={this.props.cookies.cookies.cookieToCode}
                                    value={this.state.settingsStationTo}
                                    onChange={(e) => this.displayMatches(e, "to")}
                                />
                                {
                                    settingsSearchTo &&
                                    <div style={{background: "#f9f9f9", padding: "5px"}}>
                                        {
                                            settingsSearchTo.map((result, i) =>
                                                <li key={i} onClick={(e) => this.updateToInputField(e, result)} data-station={result.stationName} data-code={result.crsCode}>
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
