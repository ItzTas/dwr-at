import { useEffect } from 'react';
import { adjustDateTimeForTimezone } from '../../utils/core';
import { Dayjs } from 'dayjs';
import GridComponent from '../grid';
import TextFieldComponent from '../textfield';
import ButtonComponent from '../button';
import DateTimePickerComponent from '../dateTimePicker';

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
        if (!data.action_type) {
            setData((prevData) => ({ ...prevData, action_type: 3 }));
        }
    }, [data, setData]);

    const handleDateChange = (value: Dayjs | null) => {
        setData((prevData) => ({
            ...prevData,
            start_date: value ? value.toDate() : null,
        }));
    };

    const handleButtonClick = (type: number) => {
        setData((prevData) => ({
            ...prevData,
            type,
        }));
    };

    const handleObservationChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setData((prevData) => ({
            ...prevData,
            observation: event.target.value,
        }));
    };

    return (
        <GridComponent container spacing={2}>
            <GridComponent item xs={12}>
                <DateTimePickerComponent
                    value={
                        data?.start_date ? adjustDateTimeForTimezone(data.start_date) : null
                    }
                    label={translate('data-hour-start')}
                    name='start_date'
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={handleDateChange}
                    slots={{
                        textField: (props: any) => (
                            <TextFieldComponent {...props} fullWidth />
                        ),
                    }}
                />
            </GridComponent>

            <GridComponent item xs={12}>
                <GridComponent
                    container
                    spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {['wet', 'dirty', 'both', 'clean'].map((typeKey, index) => (
                        <GridComponent item key={typeKey}>
                            <ButtonComponent
                                color={data.type === index + 1 ? 'secondary' : 'primary'}
                                onClick={() => handleButtonClick(index + 1)}
                            >
                                {translate(`diaper-${typeKey}`)}
                            </ButtonComponent>
                        </GridComponent>
                    ))}
                </GridComponent>
            </GridComponent>

            <GridComponent item xs={12}>
                <TextFieldComponent
                    value={data?.observation || ''}
                    label={translate('observation')}
                    onChange={handleObservationChange}
                    name='observation'
                    rows={6}
                    fullWidth
                    multiline
                />
            </GridComponent>
        </GridComponent>
    );
}
