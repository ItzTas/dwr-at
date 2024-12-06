import {
    DateTimePicker,
    DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import React from 'react';

interface Props extends Omit<DateTimePickerProps<any, any>, 'TextFieldProps'> {
    fullWidth?: boolean;
}

export default function DateTimePickerComponent({
    fullWidth = false,
    ...props
}: Props): React.JSX.Element {
    return (
        <LocalizationProvider
            localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
        >
            <DateTimePicker
                {...props}
                slotProps={{
                    textField: {
                        fullWidth: fullWidth,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
