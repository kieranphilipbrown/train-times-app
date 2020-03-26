import React from 'react';
import { SearchContainer, SearchForm, SearchLabel, SearchInput, SearchButton, SearchInputResult } from './Search.styles';
import { Wrapper } from '../../assets/Styled/Utility/Utility';
import stations from '../../assets/data/stations.json';

class Search extends React.Component {
    state = {
        stationFrom: '',
        stationTo: '',
        stationList: stations,
        searchResults: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        console.log(this.state);
    }

    findMatches = (wordToMatch, stations) => {
        // console.log(stations.stations)
        return stations.stations.filter(station => {
            const regex = new RegExp(wordToMatch, 'gi');
            return station.stationName.match(regex) || station.crsCode.match(regex);
        });
    }

    displayMatches = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
        const matchArray = this.findMatches(e.target.value, stations)
        console.log(matchArray);

        this.setState({
            searchResults: matchArray
        })

        // const returnedHtml = matchArray.map(station => {
        //     return `
        //         ${station.stationName}, ${station.crsCode}
        //     `
        // });
        // this.setState({
        //     returnedHtml: returnedHtml
        // })
        // console.log(returnedHtml)
    }

    updateInputField = e => {
        console.log(e.target);
        console.log(e.target.dataset)
        console.log(e.target.dataset.station)
        console.log(e.target.dataset.code)

        this.setState({
            stationFrom: e.target.dataset.station
        })
    }

    render() {
        const searchResults = this.state.searchResults;
        return (
            <SearchContainer>
                <Wrapper>
                    <SearchForm onSubmit={(e) => this.handleSubmit(e)} autocomplete={'off'}>
                        <SearchLabel htmlFor="stationfrom">Where from?</SearchLabel>
                        <div style={{position: "relative"}}>
                            <SearchInput
                                id={'stationfrom'}
                                name={'stationFrom'}
                                type={'text'}
                                placeholder={'Station Name'}
                                value={this.state.stationFrom}
                                onChange={(e) => this.displayMatches(e)}
                            />
                            {searchResults &&
                                <SearchInputResult>
                                    {
                                        searchResults.map((result, i) =>
                                            <li key={i} onClick={(e) => this.updateInputField(e, result)}>
                                                <span data-station={result.stationName}>{result.stationName}</span>, <span data-code={result.crsCode}>{result.crsCode}</span>
                                            </li>
                                        )
                                    }
                                </SearchInputResult>
                            }
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
                            {/* <SearchInputResult>
                                <span>Suggestions:</span>
                                {this.state.returnedHtml}
                            </SearchInputResult> */}
                        <SearchButton>Search</SearchButton>
                    </SearchForm>
                </Wrapper>
            </SearchContainer>
        );
    }
}

export default Search;

