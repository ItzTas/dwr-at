import { useEffect } from 'react';
import { adjustDateTimeForTimezone } from '../../utils/core';
import GridComponent from '../grid';
import TextFieldComponent from '../textfield';
import ButtonComponent from '../button';
import DateTimePickerComponent from '../dateTimePicker';

export interface IDataEat {
    type: number;
    side?: number | null;
    start_date?: Date | null;
    end_date?: Date | null;
    quantity?: number | null;
    observation?: string;
    action_type: number;
}

interface IEatProps {
    data: IDataEat;
    setData: React.Dispatch<React.SetStateAction<IDataEat>>;
    translate: (key: string) => string;
}

export default function Eat({
    data,
    setData,
    translate,
}: IEatProps): React.JSX.Element {
    useEffect(() => {
        setData({ ...data, action_type: 2 });
    }, [data, setData]);

    return (
        <GridComponent container spacing={2}>
            <GridComponent item xs={12}>
                <GridComponent
                    container
                    spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <GridComponent item>
                        <ButtonComponent
                            color={data.type === 1 ? 'secondary' : 'primary'}
                            onClick={() => {
                                setData((prevData) => ({
                                    ...prevData,
                                    side: null,
                                    end_date: null,
                                    type: 1,
                                }));
                            }}
                        >
                            {translate('eat-bottle')}
                        </ButtonComponent>
                    </GridComponent>
                    <GridComponent item>
                        <ButtonComponent
                            color={data.type === 2 ? 'secondary' : 'primary'}
                            onClick={() => {
                                setData((prevData) => ({
                                    ...prevData,
                                    quantity: null,
                                    type: 2,
                                }));
                            }}
                        >
                            {translate('eat-bosom')}
                        </ButtonComponent>
                    </GridComponent>
                </GridComponent>
            </GridComponent>
            <GridComponent item xs={12}>
                <DateTimePickerComponent
                    value={
                        data?.start_date ? adjustDateTimeForTimezone(data.start_date) : null
                    }
                    label={
                        data.type === 1
                            ? translate('data-hour')
                            : translate('data-hour-start')
                    }
                    name='start_date'
                    fullWidth
                    ampm={false}
                    format='DD/MM/YYYY HH:mm'
                    onChange={(value: Date | null) => {
                        setData((prevData) => ({
                            ...prevData,
                            start_date: value ? new Date(value.toString()) : null,
                        }));
                    }}
                />
            </GridComponent>
            {data.type === 2 ? (
                <GridComponent item xs={12}>
                    <DateTimePickerComponent
                        value={
                            data?.end_date ? adjustDateTimeForTimezone(data.end_date) : null
                        }
                        label={translate('data-hour-end')}
                        name='end_date'
                        fullWidth
                        ampm={false}
                        format='DD/MM/YYYY HH:mm'
                        onChange={(value: Date | null) => {
                            setData((prevData) => ({
                                ...prevData,
                                end_date: value ? new Date(value.toString()) : null,
                            }));
                        }}
                    />
                </GridComponent>
            ) : null}
            {data.type === 1 ? (
                <GridComponent item xs={12}>
                    <TextFieldComponent
                        value={data?.quantity ?? ''}
                        label={translate('quantity') + ' (ml)'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const quantity = event.target.value
                                ? Number(event.target.value)
                                : null;
                            setData((prevData) => ({
                                ...prevData,
                                quantity,
                            }));
                        }}
                        name='quantity'
                        type='number'
                        fullWidth
                    />
                </GridComponent>
            ) : (
                <GridComponent item xs={12}>
                    <GridComponent
                        container
                        spacing={2}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <GridComponent item>
                            <ButtonComponent
                                color={data.side === 1 ? 'secondary' : 'primary'}
                                onClick={() => {
                                    setData((prevData) => ({
                                        ...prevData,
                                        side: 1,
                                    }));
                                }}
                            >
                                {translate('left')}
                            </ButtonComponent>
                        </GridComponent>
                        <GridComponent item>
                            <ButtonComponent
                                color={data.side === 2 ? 'secondary' : 'primary'}
                                onClick={() => {
                                    setData((prevData) => ({
                                        ...prevData,
                                        side: 2,
                                    }));
                                }}
                            >
                                {translate('right')}
                            </ButtonComponent>
                        </GridComponent>
                        <GridComponent item>
                            <ButtonComponent
                                color={data.side === 3 ? 'secondary' : 'primary'}
                                onClick={() => {
                                    setData((prevData) => ({
                                        ...prevData,
                                        side: 3,
                                    }));
                                }}
                            >
                                {translate('both')}
                            </ButtonComponent>
                        </GridComponent>
                    </GridComponent>
                </GridComponent>
            )}
            <GridComponent item xs={12}>
                <TextFieldComponent
                    value={data?.observation || ''}
                    label={translate('observation')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
