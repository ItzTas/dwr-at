import { Card, CardProps } from '@mui/material';
import React from 'react';

export default function CardComponent({
    children,
    ...props
}: CardProps): React.JSX.Element {
    return <Card {...props}>{children}</Card>;
}
