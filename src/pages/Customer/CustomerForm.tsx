import { useState, useEffect } from 'react';
import {
	Box,
	Breadcrumbs,
	Typography,
} from "@mui/material";
import Header from "../../components/header/Header";
import { Link, useParams } from "react-router-dom";
import ICustomer, { EmptyCustomer } from '../../components/models/ICustomer';
import { GET_CUSTOMER_BY_ID_URL, UPDATE_CUSTOMER_URL } from '../../axios';
import InsertCustomerForm from './InsertCustomerForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';


const CustomerForm = () => {
	const params = useParams();
	const [customer, setCustomer] = useState<ICustomer>(EmptyCustomer);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();


	let CustomerId = params.id;
	if (typeof CustomerId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchCustomer = async () => {
			var response = await axiosPrivate.get(GET_CUSTOMER_BY_ID_URL(CustomerId!));

			var data: ICustomer = response.data;
			setCustomer(data);
		};

		fetchCustomer().catch(console.error);
	}, [isEditMode])

	const OnClickEdit = () => {
		setCustomer(customer);
		setIsEditMode(true);
	}

	const OnClickCancel = () => {
		setCustomer(customer);
		setIsEditMode(false);
	}

	const HandleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCustomer((prevState: ICustomer) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}

	const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axiosPrivate.put(UPDATE_CUSTOMER_URL(CustomerId!), customer);

		const data = response.data;

		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' });
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setCustomer(response.data);
			setIsEditMode(false);
		}
	}

	return (
		<>
			<Header title="Customer " />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Master Data</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Pelanggan</Typography>
					<Typography>{customer.customerName}</Typography>
				</Breadcrumbs>
			</Box>
			<InsertCustomerForm
				handleFieldChanges={HandleChanges}
				handleSubmit={HandleSubmit}
				onClickEdit={OnClickEdit}
				onClickCancel={OnClickCancel}

				customer={customer}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default CustomerForm;
