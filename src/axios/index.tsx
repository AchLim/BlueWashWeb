import axios from "axios";
import ILaundryService from "../components/models/ILaundryService";
import ICustomer from "../components/models/ICustomer";
import ISupplier from "../components/models/ISupplier";

const API = axios.create({
    baseURL: 'https://localhost:44327',
    headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
    },
    validateStatus: (status) => {
        return true;
    }
});

const token = localStorage.getItem('token') ?? null;

API.interceptors.request.use((request) => {
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
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
export const UpdateLaundryService = (id: string, data: ILaundryService) => API.put(`/laundryservice/update/${id}`, data);

export const GetPriceMenus = () => API.get('/pricemenu/all');
export const GetPriceMenuById = (id: string) => API.get(`/pricemenu/${id}`);

export const GetCurrencies = () => API.get('/currency/all');

export const GetCurrencyById = (id: string) => API.get(`/currency/${id}`);

export const GetCustomers = () => API.get('/customer/all');
export const GetCustomerById = (id: string) => API.get(`/customer/${id}`);
export const InsertCustomer = (data: ICustomer) => API.post(`/customer/insert`, data);
export const UpdateCustomer = (id: string, data: ICustomer) => API.put(`/customer/update/${id}`, data);

export const GetSuppliers = () => API.get('/supplier/all');
export const GetSupplierById = (id: string) => API.get(`/supplier/${id}`);
export const InsertSupplier = (data: ISupplier) => API.post(`/supplier/insert`, data);
export const UpdateSupplier = (id: string, data: ISupplier) => API.put(`/supplier/update/${id}`, data);