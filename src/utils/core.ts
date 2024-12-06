import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function handleChange(
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    value: any,
    field: any,
): void {
    const updatedData = { ...data };
    updatedData[field].value = value;
    setData(updatedData);
}

function adjustDateTimeForTimezone(
    dateString: string | Date | null | undefined,
): Dayjs {
    if (!dateString) return dayjs();
    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');

    return dateInUTCMinus;
}

export { handleChange, adjustDateTimeForTimezone };
