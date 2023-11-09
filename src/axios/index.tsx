import axios from "axios";

const BASE_URL = 'https://localhost:44327';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    validateStatus: () => {
        return true;
    }
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Accept': 'application/json',
    },
})

export const GET_LAUNDRYSERVICES_URL = () => '/laundry_service/all';
export const GET_LAUNDRYSERVICE_BY_ID_URL = (id: string) => `/laundry_service/${id}`;
export const INSERT_LAUNDRYSERVICE_URL = () => '/laundry_service/insert';
export const UPDATE_LAUNDRYSERVICE_URL = (id: string) => `/laundry_service/update/${id}`;
export const DELETE_LAUNDRYSERVICE_URL = (id: string) => `/laundry_service/delete/${id}`;

export const GET_PRICEMENUS_URL = () => '/price_menu/all';
export const GET_PRICEMENU_BY_ID_URL = (id: string) => `/price_menu/${id}`;
export const INSERT_PRICEMENU_URL = () => '/price_menu/insert';
export const UPDATE_PRICEMENU_URL = (id: string) => `/price_menu/update/${id}`;
export const DELETE_PRICEMENU_URL = (id: string) => `/price_menu/delete/${id}`;


export const GET_CURRENCIES_URL = () => '/currency/all';
export const GET_CURRENCY_BY_ID_URL = (id: string) => `/currency/${id}`;
export const INSERT_CURRENCY_URL = () => '/currency/insert';
export const UPDATE_CURRENCY_URL = (id: string) => `/currency/update/${id}`;
export const DELETE_CURRENCY_URL = (id: string) => `/currency/delete/${id}`;

export const GET_CUSTOMERS_URL = () => '/customer/all';
export const GET_CUSTOMER_BY_ID_URL = (id: string) => `/customer/${id}`;
export const INSERT_CUSTOMER_URL = () => '/customer/insert';
export const UPDATE_CUSTOMER_URL = (id: string) => `/customer/update/${id}`;
export const DELETE_CUSTOMER_URL = (id: string) => `/customer/delete/${id}`;


export const GET_SUPPLIERS_URL = () => '/supplier/all';
export const GET_SUPPLIER_BY_ID_URL = (id: string) => `/supplier/${id}`;
export const INSERT_SUPPLIER_URL = () => '/supplier/insert';
export const UPDATE_SUPPLIER_URL = (id: string) => `/supplier/update/${id}`;
export const DELETE_SUPPLIER_URL = (id: string) => `/supplier/delete/${id}`;