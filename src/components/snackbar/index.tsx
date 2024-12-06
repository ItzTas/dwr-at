import { Snackbar, SnackbarProps } from '@mui/material';
import React from 'react';

export default function SnackbarComponent({
    children,
    ...props
}: SnackbarProps): React.JSX.Element {
    return <Snackbar {...props}>{children}</Snackbar>;
}
