import { useState, useEffect } from 'react';
import {
	Box,
	Breadcrumbs,
	Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import ISupplier, { EmptySupplier } from '../../models/ISupplier';
import { GET_SUPPLIER_BY_ID_URL, UPDATE_SUPPLIER_URL } from '../../axios';
import InsertSupplierForm from './InsertSupplierForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';


const SupplierForm = () => {
	const params = useParams();
	const [supplier, setSupplier] = useState<ISupplier>(EmptySupplier);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();


	let SupplierId = params.id;
	if (typeof SupplierId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchSupplier = async () => {
			var response = await axiosPrivate(GET_SUPPLIER_BY_ID_URL(SupplierId!));
            const data = response.data;
            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' })
            } else {
                setSupplier(data);
            }
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

		var response = await axiosPrivate.put(UPDATE_SUPPLIER_URL(SupplierId!), supplier);
		const data = response.data;
		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' })
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setSupplier(data);
			setIsEditMode(false);
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
		</>
	);
};

export default SupplierForm;
