import { useEffect, useState } from 'react';
import { Snackbar, Alert, LinearProgress, Box } from '@mui/material';

type AlertBarSeverity = 'success' | 'error' | 'info' | 'warning';

interface ProgressAlertProps {
    severity?: AlertBarSeverity;
    message: string;
    autoHideDuration?: number;
    open: boolean;
    onClose: () => void;
}

export default function AlertBarComponent({
    severity = 'info',
    message,
    autoHideDuration = 6000,
    open,
    onClose,
}: ProgressAlertProps): React.JSX.Element {
    const [progress, setProgress] = useState(0);

    const progressColor = {
        success: 'green',
        error: 'red',
        info: 'blue',
        warning: 'orange',
    };

    function handleClose(
        _: Event | React.SyntheticEvent<any, Event>,
        reason: string,
    ) {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    }

    useEffect(() => {
        let intervalId: number;

        if (open) {
            const startTime = Date.now();
            intervalId = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progressValue = Math.min(
                    (elapsedTime / autoHideDuration) * 100,
                    100,
                );
                setProgress(progressValue);

                if (elapsedTime >= autoHideDuration) {
                    clearInterval(intervalId);
                    onClose();
                }
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [open, autoHideDuration, onClose]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Box sx={{ width: '100%' }}>
                <LinearProgress
                    variant='determinate'
                    value={progress}
                    sx={{
                        height: '10px',
                        marginTop: '-4px',
                        borderRadius: '2px 2px 0 0',
                        backgroundColor: progressColor[severity],
                    }}
                />
                <Alert onClose={onClose} severity={severity}>
                    <p>{message}</p>
                </Alert>
            </Box>
        </Snackbar>
    );
}

export type { AlertBarSeverity };
