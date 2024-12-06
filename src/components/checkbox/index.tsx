import { Checkbox, CheckboxProps } from '@mui/material';
import React from 'react';

export default function CheckboxComponent(
    props: CheckboxProps,
): React.JSX.Element {
    return <Checkbox {...props} />;
}
