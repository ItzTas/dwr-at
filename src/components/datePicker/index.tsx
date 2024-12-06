import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import React from 'react';

export default function DatePickerComponent({
    ...props
}: React.ComponentProps<typeof DatePicker>): React.JSX.Element {
    return (
        <LocalizationProvider
            localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
        >
            <DemoContainer components={['DatePicker']}>
                <DatePicker {...props} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
