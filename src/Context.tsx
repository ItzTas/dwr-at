import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import SnackbarComponent from './components/snackbar';
import GridComponent from './components/grid';
import AlertComponent from './components/alert';
import i18n from './i18n';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export interface AppContextProps {
    changeLanguage: (lang: string) => void;
    showSnackMessage: (message: string) => void;
    showAlertMessage: (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
        variant?: 'filled' | 'outlined' | 'standard',
    ) => void;
    translate: (key: string) => string;
}

const AppContext = createContext<AppContextProps | null>(null);

interface Props {
    children: React.ReactNode;
}

export default function AppProvider({ children }: Props): React.JSX.Element {
    const { t: translate } = useTranslation();
    const timeoutDuration = 6000;

    const [snackOpen, setSnackOpen] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');

    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<
        'success' | 'error' | 'info' | 'warning'
    >('info');
    const [alertVariant, setAlertVariant] = useState<
        'filled' | 'outlined' | 'standard'
    >('filled');

    const changeLanguage = useCallback((lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }, []);

    function showSnackMessage(message: string): void {
        setSnackMessage(message);
        setSnackOpen(true);
    }

    function showAlertMessage(
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
        variant: 'filled' | 'outlined' | 'standard' = 'filled',
    ): void {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertVariant(variant);

        setTimeout(() => {
            setAlertMessage('');
        }, timeoutDuration);
    }

    const handleClose = () => {
        setSnackMessage('');
        setSnackOpen(false);
    };

    const sharedState: AppContextProps = {
        changeLanguage,
        showSnackMessage,
        showAlertMessage,
        translate,
    };

    useEffect(() => {
        const storeLanguage = localStorage.getItem('language');

        if (storeLanguage) {
            changeLanguage(storeLanguage);
            return;
        }
        const navLang = navigator.language.split('-')[0];
        changeLanguage(navLang);
    }, [changeLanguage]);

    return (
        <div className='app-background'>
            <AppContext.Provider value={sharedState}>
                {children}
                <SnackbarComponent
                    autoHideDuration={timeoutDuration}
                    onClose={handleClose}
                    open={snackOpen}
                    message={snackMessage}
                />
                {alertMessage && (
                    <GridComponent
                        container
                        sx={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            padding: 2,
                        }}
                    >
                        <GridComponent item xs={12}>
                            <AlertComponent variant={alertVariant} severity={alertSeverity}>
                                {alertMessage}
                            </AlertComponent>
                        </GridComponent>
                    </GridComponent>
                )}
            </AppContext.Provider>
        </div>
    );
}

export { AppContext };
