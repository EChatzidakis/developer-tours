export const DateFormatting = (props) => {

    const getDefaultDates = () => {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(startDate.getDate() + 5);

        const startDateFormatted = formatDateToISO(startDate);
        const endDateFormatted = formatDateToISO(endDate);

        return { startDate: startDateFormatted, endDate: endDateFormatted }
    }

    const formatDateToISO = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0] + 'T12:00:00.000Z';
    }

    const formatDateDDMMYYYY = (isoDate) => {
        const date = new Date(isoDate);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    const type = props.type;
    const _date = props.date;

    switch (type) {
        case 'toIsoDate':
            return formatDateToISO(_date);
        case 'toDDMMYYYY':
            return formatDateDDMMYYYY(_date);
        default:
            return getDefaultDates();
    }
}