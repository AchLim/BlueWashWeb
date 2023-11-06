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
import ISupplier, { EmptySupplier } from '../../components/models/ISupplier';
import { AlertProps } from 'reactstrap';
import { GetSupplierById, UpdateSupplier } from '../../axios';
import InsertSupplierForm from './InsertSupplierForm';
import SnackBar from '../../components/snackbar/Snackbar';


const SupplierForm = () => {
	const params = useParams();
	const [supplier, setSupplier] = useState<ISupplier>(EmptySupplier);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);


	let SupplierId = params.id;
	if (typeof SupplierId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchSupplier = async () => {
			var response = await GetSupplierById(SupplierId!);

			var data: ISupplier = response.data;
			setSupplier(data);
		};

		fetchSupplier().catch(console.error);
	}, [isEditMode])

	const OnClickEdit = () => {
		setSupplier(supplier);
		setIsEditMode(true);
	}

	const OnClickCancel = () => {
		setSupplier(supplier);
		setIsEditMode(false);
	}

	const HandleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSupplier((prevState: ISupplier) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}

	const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		var response = await UpdateSupplier(SupplierId!, supplier);
		if (response.status == 201) {
			setSnackbar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setSupplier(response.data);
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
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Pemasok</Typography>
					<Typography>{supplier.supplierName}</Typography>
				</Breadcrumbs>
			</Box>
			<InsertSupplierForm
				handleFieldChanges={HandleChanges}
				handleSubmit={HandleSubmit}
				onClickEdit={OnClickEdit}
				onClickCancel={OnClickCancel}

				supplier={supplier}
				isEditMode={isEditMode}
			/>


			<SnackBar
				snackbar={snackbar}
				setSnackbar={setSnackbar}
			/>
		</>
	);
};

export default SupplierForm;
