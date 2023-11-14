import axios from '../axios';
import useAuth from './useAuth';

interface ITokenData {
    username: string;
    accessToken: string;
}

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const tokens = await axios.get('/auth/refresh-token');

        const response: ITokenData = tokens.data;
        const newUsername = response.username;
        const newAccessToken = response.accessToken;

        setAuth(prev => {
            localStorage.setItem('accessToken', newAccessToken)
            return { ...prev, username: newUsername, accessToken: newAccessToken };
        });

        return newAccessToken;
    }

    return refresh;
}

export default useRefreshToken;