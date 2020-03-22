import React from 'react';

import { ReactComponent as ClockIcon } from '../../assets/images/clock-icon.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/images/right-arrow-icon.svg';
import { StyledCard, CardInner } from './Card.styles';

const Card = ({ train }) => (
    <StyledCard>
        <CardInner>
            <p className="train-title">
                {
                    train.expected_arrival_time === null || train.expected_arrival_time === ''
                    ?
                    <>
                        <ClockIcon />
                        <span className="train-time">N/A</span>
                    </>
                    :
                    <>
                        <ClockIcon />
                        <span className="train-time">{train.expected_arrival_time}</span>
                    </>
                }
                {train.destination_name}
            </p>
			<p style={{color: "#6e6e6e", fontSize: "14px"}}> From: {train.origin_name}</p>
            {
				train.status === "LATE" || train.status === "CANCELLED"
				?
				<span className="train-status train-status--red">
					{train.status.toLowerCase()}
				</span>
				:
				<span className="train-status train-status--green">
					{train.status.toLowerCase()}
				</span>
			}
            <RightArrowIcon />
        </CardInner>
    </StyledCard>
);

export default Card;
