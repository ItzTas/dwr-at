import { useEffect } from 'react';
import GridComponent from '../grid';
import TextFieldComponent from '../textfield';
import DateTimePickerComponent from '../dateTimePicker';
import dayjs from 'dayjs';

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
        if (data.action_type !== 1) {
            setData((prevData) => ({ ...prevData, action_type: 1 }));
        }
    }, [setData, data.action_type]);

    return (
        <GridComponent container spacing={2}>
            <GridComponent item xs={12}>
                <DateTimePickerComponent
                    value={data?.start_date ? dayjs(data.start_date) : null}
                    label={translate('data-hour-start')}
                    name='start_date'
                    fullWidth
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value) => {
                        setData((prevData) => ({
                            ...prevData,
                            start_date: value?.toDate() || null,
                        }));
                    }}
                />
            </GridComponent>
            <GridComponent item xs={12}>
                <DateTimePickerComponent
                    value={data?.end_date ? dayjs(data.end_date) : null}
                    label={translate('data-hour-end')}
                    name='end_date'
                    fullWidth
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value) => {
                        setData((prevData) => ({
                            ...prevData,
                            end_date: value?.toDate() || null,
                        }));
                    }}
                />
            </GridComponent>
            <GridComponent item xs={12}>
                <TextFieldComponent
                    value={data?.observation || ''}
                    label={translate('observation')}
                    onChange={(event) => {
                        setData((prevData) => ({
                            ...prevData,
                            observation: event.target.value,
                        }));
                    }}
                    name='observation'
                    rows={6}
                    fullWidth
                    multiline
                />
            </GridComponent>
        </GridComponent>
    );
}
