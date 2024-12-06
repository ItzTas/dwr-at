type Field<T> = {
    value: T;
    error: string | null;
    helperText: string | null;
};

type HandleChange<T> = {
    [key: string]: Field<T>;
};

function handleChange<T>(
    data: HandleChange<T>,
    setData: React.Dispatch<React.SetStateAction<any>>,
    value: T,
    field: string,
): void {
    const updatedData = { ...data };
    updatedData[field].value = value;
    setData(updatedData);
}

export { handleChange };
