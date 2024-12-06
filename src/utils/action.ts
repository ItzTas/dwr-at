interface FormData {
    [key: string]: any;
}

function generateSubtitle(
    item: any,
    translate: (key: string) => string,
): string {
    let subtitle = '';

    switch (item.action_type) {
        case 1:
            subtitle = `${translate('start-date')}: ${new Date(item.start_date).toLocaleString()} - ${translate('end-date')}: ${item.end_date ? new Date(item.end_date).toLocaleString() : translate('no-end-date')}`;
            break;
        case 2:
            subtitle = `${translate('start-date')}: ${new Date(item.start_date).toLocaleString()}`;
            if (item.side) {
                subtitle += `, ${translate('side')}: ${item.side}`;
            }
            if (item.quantity !== null) {
                subtitle += `, ${translate('quantity')}: ${item.quantity}`;
            }
            break;
        case 3:
            subtitle = `${translate('start-date')}: ${new Date(item.start_date).toLocaleString()}`;
            break;
        default:
            subtitle = translate('unknown');
            break;
    }

    if (item.observation) {
        subtitle += ` - ${translate('observation')}: ${item.observation}`;
    }

    return subtitle;
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

export { generateSubtitle, getTitle, validateFields };
