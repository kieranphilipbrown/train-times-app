import React from 'react';

import { StyledModal, ModalInner, ModalClose, ModalUpper, ModalMiddle, ModalLower } from './Modal.styles';

import { ReactComponent as TransPennineLogo } from '../../assets/images/tp-express-icon.svg';
import { ReactComponent as NorthernRailLogo } from '../../assets/images/northern-rail.svg';
import { ReactComponent as ArrivaWalesLogo } from '../../assets/images/arriva-wales.svg';

const operatorLogos = {
    TP: <TransPennineLogo />,
    NT: <NorthernRailLogo />,
    AW: <ArrivaWalesLogo />,
}

const Modal = ({ showModal, destination_name, status, origin_name, expected_arrival_time, aimed_arrival_time, aimed_departure_time, operator, toggleModal }) => (
    <>
        {
            showModal &&
            <StyledModal>
            <ModalInner>
                <ModalClose onClick={toggleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="38" viewBox="0 0 24 24" width="38"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#9a9a9a" d="M13.89 8.7L12 10.59 10.11 8.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 8.7 13.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l1.89 1.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l1.89-1.89c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </ModalClose>
                <ModalUpper>
                    <p style={{fontWeight: "bold", marginRight: "45px"}}>{destination_name}</p>
                    {
                        status === "LATE"
                        ?
                        <span style={{fontSize: "14px", background: "#ff5656", border: "1px solid #e62525", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>
                            {status.toLowerCase()}
                        </span>
                        :
                        <span style={{fontSize: "14px", background: "#59e32c", border: "1px solid #48c220", padding: "5px 10px", display: "inline-block", borderRadius: "3px"}}>
                            {status.toLowerCase()}
                        </span>
                    }
                    <p style={{color: "#6e6e6e", fontSize: "14px", display: "block", marginBottom: "15px"}}>From: {origin_name}</p>
                    <p>Expected: {expected_arrival_time}</p>
                </ModalUpper>
                <ModalMiddle>
                    <div>
                        <p style={{alignItems: 'center', display: 'flex', fontSize: '14px'}}>
                            <svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            Arrives: {aimed_arrival_time}
                        </p>
                    </div>
                    <div>
                        <p style={{alignItems: 'center', display: 'flex', fontSize: '14px'}}>
                            <svg style={{marginRight: "8px", marginTop: "-3px", fill: "#8e8e8e"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            Departs: {aimed_departure_time}
                        </p>
                    </div>
                </ModalMiddle>
                <ModalLower>
                    <span style={{color: '#737B87', fontSize: '12px', display: 'block', fontWeight: 'bold', textAlign: 'left'}}>OPERATOR</span>
                    {operatorLogos[operator]}
                </ModalLower>
            </ModalInner>
        </StyledModal>
        }
    </>

);

export default Modal;
