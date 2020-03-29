import React from 'react';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight, StationContainer } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';

const Settings = ({ showSettingsMenu, toggleSettingsMenu }) => (
    <StyledSettingsContainer>
        <SettingsContainerLeft showSettingsMenu={showSettingsMenu}>
            <SettingsCloseIcon onClick={toggleSettingsMenu} />
            <h2>Settings Menu</h2>
            <p>Quick access buttons:</p>
            <StationContainer>
                <p>Station to:</p>
                <input placeholder="Station to" />
                <p>Station from:</p>
                <input placeholder="Station from" />
            </StationContainer>
        </SettingsContainerLeft>
        <SettingsContainerRight onClick={toggleSettingsMenu} showSettingsMenu={showSettingsMenu}></SettingsContainerRight>
    </StyledSettingsContainer>
);

export default Settings;
