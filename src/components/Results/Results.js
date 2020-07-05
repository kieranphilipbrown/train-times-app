import React from 'react';
import { StyledResult, ResultInner } from './Results.styles';

const Results = ({ results }) => (
    <StyledResult>
        <ResultInner>
            <p className="result">{results} results</p>
            <p>There are currently no trains running between those stations. Try another search.</p>
        </ResultInner>
    </StyledResult>
);

export default Results;
