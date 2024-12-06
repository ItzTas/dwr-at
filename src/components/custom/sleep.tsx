import { useEffect } from 'react';
import { DateTimePicker, Grid, TextField } from '..';
import { handleInputChange } from '../../utils/action';
import { adjustDateTimeForTimezone } from '../../utils/core';

export interface IDataSleep {
    start_date?: Date | null;
    end_date?: Date | null;
    observation?: string;
    action_type?: number;
    formData?: FormData;
}

interface ISleepProps {
    data: IDataSleep;
    setData: React.Dispatch<React.SetStateAction<IDataSleep>>;
    translate: (key: string) => string;
}

export default function Sleep({
    data,
    setData,
    translate,
}: ISleepProps): React.JSX.Element {
    useEffect(() => {
        setData({ ...data, action_type: 1 });
    }, [data, setData]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DateTimePicker
                    value={
                        data?.start_date
                            ? adjustDateTimeForTimezone(data?.start_date)
                            : null
                    }
                    label={translate('data-hour-start')}
                    name='start_date'
                    fullWidth
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value: Date | null) => {
                        handleInputChange(
                            'start_date',
                            value ? new Date(value.toString()) : null,
                            data,
                            setData,
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <DateTimePicker
                    value={
                        data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null
                    }
                    label={translate('data-hour-end')}
                    name='end_date'
                    fullWidth
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value: Date | null) => {
                        handleInputChange(
                            'end_date',
                            value ? new Date(value.toString()) : null,
                            data,
                            setData,
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={data?.observation || ''}
                    label={translate('observation')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputChange('observation', event.target.value, data, setData);
                    }}
                    name='observation'
                    rows={6}
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    );
}
