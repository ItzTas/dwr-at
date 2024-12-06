import { useEffect } from 'react';
import { Button, DateTimePicker, Grid, TextField } from '..';
import { handleInputChange, selectItem } from '../../utils/action';
import { adjustDateTimeForTimezone } from '../../utils/core';
import { Dayjs } from 'dayjs';

export interface IDataDiaper {
    start_date?: Date | null;
    type: number;
    observation?: string;
    action_type: number;
}

interface IDiaperProps {
    data: IDataDiaper;
    setData: React.Dispatch<React.SetStateAction<IDataDiaper>>;
    translate: (key: string) => string;
}

export default function Diaper({
    data,
    setData,
    translate,
}: IDiaperProps): React.JSX.Element {
    useEffect(() => {
        setData({ ...data, action_type: 3 });
    }, [data, setData]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DateTimePicker
                    value={
                        data?.start_date ? adjustDateTimeForTimezone(data.start_date) : null
                    }
                    label={translate('data-hour-start')}
                    name='start_date'
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value: Dayjs | null) => {
                        handleInputChange(
                            'start_date',
                            value ? value.toDate() : null,
                            data,
                            setData,
                        );
                    }}
                    slots={{
                        textField: (props) => <TextField {...props} fullWidth />,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    color={data.type === 1 ? 'secondary' : 'primary'}
                    onClick={() => selectItem(1, 'type', data, setData)}
                >
                    {translate('diaper-wet')}
                </Button>
                <Button
                    color={data.type === 2 ? 'secondary' : 'primary'}
                    onClick={() => selectItem(2, 'type', data, setData)}
                >
                    {translate('diaper-dirty')}
                </Button>
                <Button
                    color={data.type === 3 ? 'secondary' : 'primary'}
                    onClick={() => selectItem(3, 'type', data, setData)}
                >
                    {translate('diaper-both')}
                </Button>
                <Button
                    color={data.type === 4 ? 'secondary' : 'primary'}
                    onClick={() => selectItem(4, 'type', data, setData)}
                >
                    {translate('diaper-clean')}
                </Button>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    value={data?.observation || ''}
                    label={translate('observation')}
                    onChange={(event) =>
                        handleInputChange('observation', event.target.value, data, setData)
                    }
                    name='observation'
                    rows={6}
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    );
}
