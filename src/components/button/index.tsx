import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export default function ButtonComponent({
    children,
    ...props
}: ButtonProps): React.JSX.Element {
    const { variant = 'contained', size = 'large' } = props;

    return (
        <Button
            className={`general-button ${props.className ? props.className : ''}`}
            variant={variant}
            size={size}
            {...props}
        >
            {children}
        </Button>
    );
}
