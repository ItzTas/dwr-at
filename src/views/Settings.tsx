import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../useAppContext';
import BoxComponent from '../components/box';
import TextFieldComponent from '../components/textfield';
import ButtonComponent from '../components/button';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import TextComponent from '../components/typography';
import AppBarComponent from '../components/custom/appBar';

function Settings(): React.JSX.Element {
    const { translate, changeLanguage, showAlertMessage } = useAppContext();
    const navigate = useNavigate();

    const [babyName, setBabyName] = useState<string>('');
    const [babyWeight, setBabyWeight] = useState<number | string>('');
    const [babyHeight, setBabyHeight] = useState<number | string>('');
    const [language, setLanguage] = useState<string>('');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language.split('-')[0];

        if (savedLanguage) {
            setLanguage(savedLanguage);
            changeLanguage(savedLanguage);
            return;
        }
        const initialLanguage =
            browserLanguage === 'pt' ? 'pt' : browserLanguage === 'es' ? 'es' : 'en';
        setLanguage(initialLanguage);
        changeLanguage(initialLanguage);
    }, [changeLanguage]);

    useEffect(() => {
        const storedBabyData = localStorage.getItem('babyinfos') || '{}';
        const babyData = JSON.parse(storedBabyData);
        setBabyName(babyData.name || '');
        setBabyWeight(babyData.weight || '');
        setBabyHeight(babyData.height || '');
    }, []);

    function handleLanguageChange(event: SelectChangeEvent<string>) {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        changeLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    }

    function handleSaveSettings() {
        const babyData = { name: babyName, weight: babyWeight, height: babyHeight };
        localStorage.setItem('babyinfos', JSON.stringify(babyData));

        showAlertMessage('Informações salvas com sucesso!', 'success');
        navigate('/');
    }

    function handleLogout() {
        localStorage.removeItem('session');
        navigate('/signin');
    }

    return (
        <>
            <AppBarComponent title={translate('settings')} />
            <BoxComponent sx={{ padding: 3 }}>
                <h2 style={{ textAlign: 'center' }}>{translate('settings')}</h2>

                <TextComponent
                    sx={{
                        textAlign: 'center',
                        marginBottom: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}
                >
                    {translate('language')}
                </TextComponent>
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    label={translate('language')}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                >
                    <MenuItem value='pt'>{translate('portugues')}</MenuItem>
                    <MenuItem value='en'>{translate('english')}</MenuItem>
                    <MenuItem value='es'>{translate('spanish')}</MenuItem>
                </Select>

                <TextFieldComponent
                    label={translate('name')}
                    value={babyName}
                    onChange={(e) => setBabyName(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextFieldComponent
                    label={translate('weight')}
                    type='number'
                    value={babyWeight}
                    onChange={(e) => setBabyWeight(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextFieldComponent
                    label={translate('height')}
                    type='number'
                    value={babyHeight}
                    onChange={(e) => setBabyHeight(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                <ButtonComponent
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={handleSaveSettings}
                    sx={{ marginBottom: 2 }}
                >
                    {translate('save')}
                </ButtonComponent>

                <ButtonComponent
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    onClick={handleLogout}
                >
                    {translate('logout')}
                </ButtonComponent>
            </BoxComponent>
        </>
    );
}

export default Settings;
