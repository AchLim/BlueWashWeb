

export const ConvertDateTimeToDate = (datetime: Date) => {
    var date = datetime.toISOString().split('T')[0];
    return date;
}