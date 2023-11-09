import axios from '../axios';
import useAuth from './useAuth';

interface ITokenData {
    login: string;
    accessToken: string;
    refreshToken: string;
}

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refreshToken = sessionStorage.getItem('refreshToken') ?? '';

    const refresh = async () => {
        const tokens = await axios.post('/auth/refresh-token', {
            refreshToken
        });

        const response: ITokenData = tokens.data;
        const newAccessToken = response.accessToken;
        const newRefreshToken = response.refreshToken;

        setAuth(prev => {
            localStorage.setItem('accessToken', newAccessToken)
            sessionStorage.setItem('refreshToken', newRefreshToken)
            return { ...prev, accessToken: newAccessToken };
        });

        return newAccessToken;
    }

    return refresh;
}

export default useRefreshToken;