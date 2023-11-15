

export const ConvertDateTimeToDate = (datetime: Date) => {
    var date = datetime.toISOString().split('T')[0];
    console.log('converted datetime to date: ' + date);
    console.log('converted datetime to date: ' + new Date(date));
    return date;
}