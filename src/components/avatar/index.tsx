import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';

export default function AvatarComponent(props: AvatarProps): React.JSX.Element {
    return <Avatar {...props} />;
}
