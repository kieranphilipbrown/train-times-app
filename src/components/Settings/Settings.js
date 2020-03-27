import React from 'react';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight, StationContainer } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';

const Settings = ({ showSettingsMenu, toggleSettingsMenu }) => (
    <>
        {
            showSettingsMenu &&
            <StyledSettingsContainer>
                <SettingsContainerLeft>
                    <SettingsCloseIcon onClick={toggleSettingsMenu} />
                    <h2>Settings Menu</h2>
                    <p>Update to/from train stations (quick access buttons):</p>
                    <StationContainer>
                        <p>Station to:</p>
                        <input placeholder="Station to" />
                        <p>Station from:</p>
                        <input placeholder="Station from" />
                    </StationContainer>
                </SettingsContainerLeft>
                <SettingsContainerRight onClick={toggleSettingsMenu}></SettingsContainerRight>
            </StyledSettingsContainer>
        }
    </>
);

export default Settings;
