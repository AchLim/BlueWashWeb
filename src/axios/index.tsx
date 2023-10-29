import axios from "axios";

const API = axios.create({
    baseURL: 'https://localhost:44327',
    headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
    }
});

const token = localStorage.getItem('token') ?? null;

API.interceptors.request.use((request) => {
    if (token) {
        request.headers.Authorization = token;
    }

    return request;
});

interface ILogin {
    login: string | undefined,
    password: string | undefined
}

export const SignIn = ({ login, password }: ILogin) => API.post('/auth/login', {login, password});

export const GetLaundryServices = () => API.get('/laundryservice/all');
export const GetLaundryServiceById = (id: string) => API.get(`/laundryservice/${id}`);

export const GetPriceMenus = () => API.get('/pricemenu/all');
export const GetPriceMenuById = (id: string) => API.get(`/pricemenu/${id}`);

export const GetCurrencies = () => API.get('/currency/all');

export const GetCurrencyById = (id: string) => API.get(`/currency/${id}`);