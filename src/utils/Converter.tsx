

export const ConvertDateTimeToDate = (datetime: Date) => {
    var date = datetime.toISOString().split('T')[0];
    return date;
}

export const ConvertNumberToCurrency = (number: number) => {
    return number.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}