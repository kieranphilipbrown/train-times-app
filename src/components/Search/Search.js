import React from 'react';
import { SearchContainer, SearchForm, SearchLabel, SearchInput, SearchButton, SearchInputResult } from './Search.styles';
import { Wrapper } from '../../assets/Styled/Utility/Utility';
import stations from '../../assets/data/stations.json';

class Search extends React.Component {
    state = {
        stationFrom: '',
        stationTo: '',
        stationList: stations,
        returnedHtml: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        console.log(this.state);
    }

    findMatches = (wordToMatch, stations) => {
        console.log(stations.stations)
        return stations.stations.filter(station => {
            const regex = new RegExp(wordToMatch, 'gi');
            return station.stationName.match(regex) || station.crsCode.match(regex);
        });
    }

    displayMatches = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.value);
        const matchArray = this.findMatches(e.target.value, stations)
        console.log(matchArray);

        const returnedHtml = matchArray.map(station => {
            return `
                ${station.stationName}, ${station.crsCode}
            `
        });
        this.setState({
            returnedHtml: returnedHtml
        })
        console.log(returnedHtml)
    }

    render() {
        return (
            <SearchContainer>
                <Wrapper>
                    <SearchForm onSubmit={(e) => this.handleSubmit(e)}>
                        <div style={{position: "relative"}}>
                            <SearchLabel htmlFor="stationfrom">Where from?</SearchLabel>
                            <SearchInput
                                id={'stationfrom'}
                                name={'stationFrom'}
                                type={'text'}
                                placeholder={'Station Name'}
                                value={this.state.stationFrom}
                                onChange={(e) => this.displayMatches(e)}
                            />
                            <SearchInputResult>{this.state.returnedHtml}</SearchInputResult>
                        </div>
                        {/* <SearchLabel htmlFor="stationto">Where to?</SearchLabel>
                        <SearchInput
                            id={'stationto'}
                            name={'stationTo'}
                            type={'text'}
                            placeholder={'Station Name'}
                            value={this.state.stationTo}
                            onChange={(e) => this.displayMatches(e)}
                        /> */}
                        <SearchButton>Search</SearchButton>
                    </SearchForm>
                </Wrapper>
            </SearchContainer>
        );
    }
}

export default Search;

