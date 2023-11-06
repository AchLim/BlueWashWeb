import { useState, useEffect } from 'react';
import {
	Box,
	Breadcrumbs,
	Typography,
	Slide,
	Alert,
	Snackbar,
} from "@mui/material";
import Header from "../../components/header/Header";
import { Link, useParams } from "react-router-dom";
import ICustomer, { EmptyCustomer } from '../../components/models/ICustomer';
import { AlertProps } from 'reactstrap';
import { GetCustomerById, UpdateCustomer } from '../../axios';
import InsertCustomerForm from './InsertCustomerForm';
import SnackBar from '../../components/snackbar/Snackbar';


const CustomerForm = () => {
	const params = useParams();
	const [customer, setCustomer] = useState<ICustomer>(EmptyCustomer);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);


	let CustomerId = params.id;
	if (typeof CustomerId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchCustomer = async () => {
			var response = await GetCustomerById(CustomerId!);

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

		var response = await UpdateCustomer(CustomerId!, customer);
		if (response.status == 201) {
			setSnackbar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setCustomer(response.data);
			setIsEditMode(false);
		} else {
			let data = response.data;
			setSnackbar({ children: data.error, severity: 'error' });
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

			<SnackBar
				snackbar={snackbar}
				setSnackbar={setSnackbar}
			/>
		</>
	);
};

export default CustomerForm;
