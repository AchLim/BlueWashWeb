import { useEffect, useState } from 'react';
import { Outlet, useNavigate,  } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { CHECK_USER_MENU_ACCESS_RIGHT_URL } from '../axios';
import useSnackBar from '../hooks/useSnackBar';

interface IRequiredAuth {
    menuName: string;
}

const RequiredAuth = (props: IRequiredAuth) => {
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();
    const [hasAccess, setHasAccess] = useState<boolean>(false);

    useEffect(() => {
        const getMenuAccessRight = async () => {
            const response = await axiosPrivate.post(CHECK_USER_MENU_ACCESS_RIGHT_URL(), {
                menuName: props.menuName
            });

            const data = response.data;
    
            if (data.error) {
                setSnackBar({ children: data.error, severity:'error' });
                navigate('/');
            } else {
                setHasAccess(true);
            }
        }

        getMenuAccessRight().catch(console.error);

    }, [])


    return (
        hasAccess && <Outlet />
    )
}

export default RequiredAuth;