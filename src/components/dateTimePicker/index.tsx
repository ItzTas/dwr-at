import {
    DateTimePicker,
    DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import React from 'react';
import { Dayjs } from 'dayjs';

export default function DateTimePickerComponent({
    ...props
}: DateTimePickerProps<Dayjs, boolean>): React.JSX.Element {
    return (
        <LocalizationProvider
            localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
        >
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker {...props} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
