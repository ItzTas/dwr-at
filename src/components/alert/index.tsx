import { Alert, AlertProps } from '@mui/material';
import React from 'react';

export default function AlertComponent({
    children,
    ...props
}: AlertProps): React.JSX.Element {
    return <Alert {...props}>{children}</Alert>;
}
