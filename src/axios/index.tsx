import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZmFmNGQwNC1iODNjLTRiODgtOWMxMS03MTRhM2NkZDIwNzYiLCJzdWIiOiJBRE1JTiIsImVtYWlsIjoiYmx1ZXdhc2guYWRtaW5AZXhhbXBsZS5jb20iLCJ1c2VyaWQiOiIyOTNjNWY1NC1lNGQ5LTQzZmYtMTlmYi0wOGRiZDI2YTc1ZWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQURNSU4iLCJTVEFGRiIsIk1BTkFHRVIiXSwiZXhwIjoxNjk3OTE5NzE2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNTAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIn0.HVCi_FzjG_MXsZBklYlES6YdL2Ms5Tk-eDpromjz-MA",
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    }
});

export const GetCurrencies = () => API.get('/currency/all');

export const GetCurrencyById = (id: string) => API.get(`/currency/${id}`);