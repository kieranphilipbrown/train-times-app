import React from 'react';
import { StyledSettingsContainer, SettingsContainerLeft, SettingsContainerRight } from './Settings.styles';
import { ReactComponent as SettingsCloseIcon } from '../../assets/images/modal-close-icon.svg';

const Settings = ({ showSettingsMenu, toggleSettingsMenu }) => (
    <>
        {
            showSettingsMenu &&
            <StyledSettingsContainer>
                <SettingsContainerLeft>
                    <SettingsCloseIcon onClick={toggleSettingsMenu} />
                    <p>Settings Menu</p>
                    <p>Update to/from train station button</p>
                </SettingsContainerLeft>
                <SettingsContainerRight onClick={toggleSettingsMenu}></SettingsContainerRight>
            </StyledSettingsContainer>
        }
    </>
);

export default Settings;
