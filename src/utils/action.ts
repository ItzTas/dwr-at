type SetData<T> = React.Dispatch<React.SetStateAction<T>>;

interface FormData {
    [key: string]: any;
}

function handleInputChange(
    field: string,
    value: string,
    data: FormData,
    setData: SetData<FormData>,
): void {
    setData({ ...data, [field]: value });
}

function selectItem(
    value: string,
    key: string,
    data: FormData,
    setData: SetData<FormData>,
): void {
    setData({ ...data, [key]: value });
}

function generateSubtitle(item: any, translate: boolean): string {
    return 'oi';
}

function getTitle(action_type: string): string {
    switch (action_type) {
        case '1':
            return 'sleep';

        case '2':
            return 'eat';

        case '3':
            return 'diaper';

        default:
            return 'eat';
    }
}

function validateDiaper(data: FormData): string[] {
    return [];
}

function validateSleep(data: FormData): string[] {
    return [];
}

function validateEat(data: FormData): string[] {
    return [];
}

function validateFields(data: FormData, actionType: string): string[] {
    switch (actionType) {
        case '1':
            return validateSleep(data);

        case '2':
            return validateEat(data);

        case '3':
            return validateDiaper(data);

        default:
            return validateEat(data);
    }
}

export {
    handleInputChange,
    generateSubtitle,
    getTitle,
    selectItem,
    validateFields,
};
