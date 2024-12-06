import React from 'react';
import {
    Tab as MuiTab,
    Tabs as MuiTabs,
    TabProps as MuiTabProps,
} from '@mui/material';
import { Box } from '@mui/material';

export function TabComponent({
    label,
    value,
    ...props
}: MuiTabProps): React.JSX.Element {
    return <MuiTab label={label} value={value} {...props} />;
}

interface TabsProps {
    value: string;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
    children: React.ReactNode;
}

export default function TabsComponent({
    value,
    onChange,
    children,
}: TabsProps): React.JSX.Element {
    return (
        <Box sx={{ width: '100%' }}>
            <MuiTabs value={value} onChange={onChange} aria-label='tabs example'>
                {children}
            </MuiTabs>
        </Box>
    );
}
