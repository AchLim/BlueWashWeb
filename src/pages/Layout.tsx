import { useEffect } from 'react';
import SideBar from "../components/Sidebar.tsx";
import { Box, Container } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSidebarToggle from "../hooks/useSidebarToggle.tsx";
import useAuth from '../hooks/useAuth.tsx';
import useAxiosPrivate from '../hooks/useAxiosPrivate.tsx';
import { GET_USERNAME_URL } from '../axios/index.tsx';

const Layout = () => {
	const { isToggle } = useSidebarToggle();
	const { auth, setAuth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getUsername = async () => {
			const response = await axiosPrivate.get(GET_USERNAME_URL());
			setAuth(prev => {
				return { ...prev, username: response.data };
			});
		}

		if (!auth.username) {
			getUsername().catch(console.error);
		}

	}, [auth])

	return (
		auth.username &&
		<>
			<Box>
				<Box
					position={"fixed"}
					top={0}
					bottom={0}
					width={300}
					overflow={"auto"}
					bgcolor={"#f8f9fa"}
					zIndex={1000}
					{...(isToggle
						? { sx: { left: { xs: "-300px", sm: 0 } } }
						: { sx: { left: { xs: 0, sm: "-300px" } } })}
				>
					<SideBar />
				</Box>
				<Box
					{...(isToggle
						? { sx: { pl: { xs: 0, sm: "300px" } } }
						: { sx: { pl: { xs: "0", sm: 0 } } })}
				>
					<Container sx={{ paddingBottom: 3 }}>
						<Outlet />
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default Layout;
