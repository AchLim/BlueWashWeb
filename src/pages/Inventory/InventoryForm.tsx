import { useState, useEffect } from 'react';
import {
	Box,
	Breadcrumbs,
	Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import IInventory, { EmptyInventory } from '../../models/IInventory';
import { GET_INVENTORY_BY_ID_URL, UPDATE_INVENTORY_URL } from '../../axios';
import InsertInventoryForm from './InsertInventoryForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';


const InventoryForm = () => {
	const params = useParams();
	const [inventory, setInventory] = useState<IInventory>(EmptyInventory);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();


	let InventoryId = params.id;
	if (typeof InventoryId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchInventory = async () => {
			var response = await axiosPrivate(GET_INVENTORY_BY_ID_URL(InventoryId!));
            const data = response.data;
            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' })
            } else {
                setInventory(data);
            }
		};

		fetchInventory().catch(console.error);
	}, [isEditMode])

	const OnClickEdit = () => {
		setInventory(inventory);
		setIsEditMode(true);
	}

	const OnClickCancel = () => {
		setInventory(inventory);
		setIsEditMode(false);
	}

	const HandleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInventory((prevState: IInventory) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}

	const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		var response = await axiosPrivate.put(UPDATE_INVENTORY_URL(InventoryId!), inventory);
		const data = response.data;
		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' })
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setInventory(data);
			setIsEditMode(false);
		}
	}

	return (
		<>
			<Header title="Customer " />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Master Data</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Persediaan</Typography>
					<Typography>{inventory.itemName}</Typography>
				</Breadcrumbs>
			</Box>
			<InsertInventoryForm
				handleFieldChanges={HandleChanges}
				handleSubmit={HandleSubmit}
				onClickEdit={OnClickEdit}
				onClickCancel={OnClickCancel}

				inventory={inventory}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default InventoryForm;
