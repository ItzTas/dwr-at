function handleChange(
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    value: any,
    field: string,
): void {
    const updatedData = { ...data };
    updatedData[field].value = value;
    setData(updatedData);
}

export { handleChange };
