import { axiosPrivate } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import useSnackBar from "./useSnackBar";
import { useLocation, useNavigate } from "react-router-dom";
import { InternalAxiosRequestConfig } from "axios";

interface InternalAxiosRequestConfigWithSent extends InternalAxiosRequestConfig {
    sent?: boolean;
}

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken') ?? '';

        if (!auth.accessToken) {
            setAuth({ accessToken })
        }

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth.accessToken ?? accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            async (response) => {
                const prevResponse: InternalAxiosRequestConfigWithSent = response.config;
                if (prevResponse.sent) {
                    setSnackBar({ children: 'Berhasil menghubungkan kembali', severity: 'success' });
                }

                return response;
            },
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    setSnackBar({ children: 'Sesi telah berakhir, menghubungkan kembali...', severity: 'warning' });
                    prevRequest.sent = true;

                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                } else if (error?.response?.status === 401 && prevRequest?.sent) {
                    setSnackBar({ children: 'Gagal menghubungkan kembali, silahkan melakukan login.', severity: 'error' });
                    navigate('/admin-login', { state: { from: location }, replace: true });
                } else if (error?.response?.status === 403) {
                    setSnackBar({ children: 'Tidak ada hak akses!', severity: 'error' });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;