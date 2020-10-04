import React from 'react';
import { withCookies } from 'react-cookie';
import stations from '../../assets/data/stations.json';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight, StationContainer, SettingsSearchResults } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg';
import { ReactComponent as FlagIcon } from '../../assets/images/flag-icon.svg';

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
        return stations.stations.filter(station => {
            const regex = new RegExp(wordToMatch, 'gi');
            return station.stationName.match(regex) || station.crsCode.match(regex);
        });
    }

    displayMatches = (e, inputType) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const matchArray = this.findMatches(e.target.value, stations)

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
        this.props.cookies.set('cookieFromStation', this.state.settingsStationFrom, { path: '/', maxAge: 31536000 }) // expires in 30 days
        this.props.cookies.set('cookieToStation', this.state.settingsStationTo, { path: '/', maxAge: 31536000 }) // expires in 30 days
        this.props.cookies.set('cookieFromCode', this.state.stationFromCode, { path: '/', maxAge: 31536000 }) // expires in 30 days
        this.props.cookies.set('cookieToCode', this.state.stationToCode, { path: '/', maxAge: 31536000 }) // expires in 30 days
    }

    render() {
        const { showSettingsMenu, toggleSettingsMenu } = this.props;
        const { settingsSearchFrom, settingsSearchTo } = this.state;
        return (
            <StyledSettingsContainer>
                <SettingsContainerLeft showSettingsMenu={showSettingsMenu}>
                    <SettingsCloseIcon onClick={toggleSettingsMenu} />
                    <h2>Settings Menu</h2>
                    <StationContainer>
                        <h4>Quick access buttons:</h4>
                        <form onSubmit={(e) => this.handleSetStationsSubmit(e)} autoComplete="off">
                            <>
                                <label htmlFor="stationFrom">
                                    <HomeIcon />
                                    Home station
                                </label>
                                <input
                                    id={'settingsStationFrom'}
                                    name={'settingsStationFrom'}
                                    type={'text'}
                                    placeholder={this.props.cookies.cookies.cookieFromStation || 'Station name'}
                                    value={this.state.settingsStationFrom}
                                    onChange={(e) => this.displayMatches(e, "from")}
                                />
                                {
                                    settingsSearchFrom &&
                                    <SettingsSearchResults>
                                        {
                                            settingsSearchFrom.map((result, i) =>
                                                <li key={i} onClick={(e) => this.updateFromInputField(e, result)} data-station={result.stationName} data-code={result.crsCode}>
                                                    {result.stationName}, {result.crsCode}
                                                </li>
                                            )
                                        }
                                    </SettingsSearchResults>
                                }
                            </>
                            <>
                                <label htmlFor="stationFrom">
                                    <FlagIcon />
                                    Destination station
                                </label>
                                <input
                                    id={'settingsStationTo'}
                                    name={'settingsStationTo'}
                                    type={'text'}
                                    placeholder={this.props.cookies.cookies.cookieToStation || 'Station name'}
                                    value={this.state.settingsStationTo}
                                    onChange={(e) => this.displayMatches(e, "to")}
                                />
                                {
                                    settingsSearchTo &&
                                    <SettingsSearchResults>
                                        {
                                            settingsSearchTo.map((result, i) =>
                                                <li key={i} onClick={(e) => this.updateToInputField(e, result)} data-station={result.stationName} data-code={result.crsCode}>
                                                    {result.stationName}, {result.crsCode}
                                                </li>
                                            )
                                        }
                                    </SettingsSearchResults>
                                }
                            </>
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
