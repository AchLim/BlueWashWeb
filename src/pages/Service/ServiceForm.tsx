import React, { useEffect, useState } from 'react';
import {
	Box,
	Breadcrumbs,
	Button,
	Stack,
	TextField,
	Typography,
	IconButton,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import Header from "../../components/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import ILaundryService from '../../models/ILaundryService';
import { GET_LAUNDRYSERVICE_BY_ID_URL, UPDATE_LAUNDRYSERVICE_URL } from '../../axios';
import IPriceMenu from '../../models/IPriceMenu';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';

const columns: GridColDef<IPriceMenu>[] = [
	{ field: "name", headerName: "Nama", width: 170 },
	{ field: "price", headerName: "Harga", width: 170 },
	{ field: "pricingOptionDisplay", headerName: "Satuan", width: 170 },
	{ field: "processingTimeDisplay", headerName: "Waktu Pengerjaan", width: 170 },
	{ field: "deliveryOptionDisplay", headerName: "Opsi Pengerjaan", width: 170 },
];

const ServiceForm = () => {
	const params = useParams();
	const [laundryService, setLaundryService] = useState<ILaundryService>({
		id: "",
		name: "",
		laundryProcess: 0,
		priceMenus: [],
		laundryProcessWash: false,
		laundryProcessDry: false,
		laundryProcessIron: false
	});

	const [isEditMode, setIsEditMode] = useState<boolean>(false);


	let LaundryServiceId = params.id;
	if (typeof LaundryServiceId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();

	useEffect(() => {
		const fetchLaundryService = async () => {
			var response = await axiosPrivate.get(GET_LAUNDRYSERVICE_BY_ID_URL(LaundryServiceId!));
			const data = response.data;
			if (data.error) {
				setSnackBar({ children: data.error, severity: 'error' })
			} else {
				setLaundryService(data);
			}
		};

		fetchLaundryService().catch(console.error);
	}, [isEditMode])

	const OnClickEdit = () => {
		setLaundryService(laundryService);
		setIsEditMode(true);
	}

	const OnClickCancel = () => {
		setLaundryService(laundryService);
		setIsEditMode(false);
	}

	const HandleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLaundryService((prevState: ILaundryService) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}

	const HandleCheckboxChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLaundryService((prevState: ILaundryService) => ({
			...prevState,
			[event.target.name]: event.target.checked,
		}));
	}

	const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		var response = await axiosPrivate.put(UPDATE_LAUNDRYSERVICE_URL(LaundryServiceId!), laundryService);
		const data = response.data;
		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' })
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setLaundryService(data);
		}

		setIsEditMode(false);
	}

	return (
		<>
			<Header title={laundryService?.name} />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled" >Master Data</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }} >Tipe Laundry</Typography>
					<Typography>{laundryService?.name}</Typography>
				</Breadcrumbs>
			</Box>
			<Stack
				component="form"
				onSubmit={HandleSubmit}
				className="box-soft-shadow"
				p={3}
				borderRadius={3}
				spacing={2}
				marginBottom={3}
			>
				<Box display={"flex"} gap={1} justifyContent={"right"}>
					<IconButton color={"primary"} size={"small"}>
						<Add fontSize="small" />
					</IconButton>
					<IconButton color={"primary"} size={"small"}>
						<ArrowBack fontSize="small" />
					</IconButton>
					<IconButton color={"primary"} size={"small"}>
						<ArrowForward fontSize="small" />
					</IconButton>
				</Box>

				<TextField required label="Nama" name='name' value={laundryService.name} onChange={HandleChanges} disabled={!isEditMode} />
				<FormGroup>
					<FormControlLabel control={<Checkbox name='laundryProcessWash' checked={laundryService.laundryProcessWash} onChange={HandleCheckboxChanges} disabled={!isEditMode} />} label='Cuci' />
					<FormControlLabel control={<Checkbox name='laundryProcessDry' checked={laundryService.laundryProcessDry} onChange={HandleCheckboxChanges} disabled={!isEditMode} />} label='Kering' />
					<FormControlLabel control={<Checkbox name='laundryProcessIron' checked={laundryService.laundryProcessIron} onChange={HandleCheckboxChanges} disabled={!isEditMode} />} label='Setrika' />
				</FormGroup>

				{
					isEditMode ?
						(
							<Box display={"flex"}>
								<Box>
									<Button type="submit" variant="contained" sx={{ marginRight: "1rem" }}>
										Save
									</Button>
								</Box>
								<Box>
									<Button variant='outlined' color='warning' onClick={OnClickCancel}>
										Cancel
									</Button>
								</Box>
							</Box>
						) : (
							<Box display={"flex"}>
								<Button variant="contained" color="primary" sx={{ marginRight: "1rem" }} onClick={OnClickEdit}>
									Edit
								</Button>

								<Button variant="outlined" color="warning">
									Delete
								</Button>
							</Box>
						)
				}
			</Stack>
			{
				laundryService && laundryService.priceMenus && (
					<Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
						<DataGrid
							rows={laundryService.priceMenus}
							columns={columns}
							getRowId={(row) => row?.priceMenuId}
							autoHeight
							sx={{
								'.MuiDataGrid-cell:focus': {
									outline: 'none'
								},
								'.MuiDataGrid-cell:hover': {
									cursor: 'pointer'
								},
							}}
							slots={{
								noRowsOverlay: () => (
									<Stack height="100%" alignItems={'center'} justifyContent={'center'}>
										Data kosong.
									</Stack>
								),
								noResultsOverlay: () => (
									<Stack height="100%" alignItems={'center'} justifyContent={'center'}>
										Data tidak ditemukan.
									</Stack>
								),
								toolbar: GridToolbar
							}}
							slotProps={{
								toolbar: {
									showQuickFilter: true,
									quickFilterProps: {
										debounceMs: 300
									}
								}
							}}
						/>
					</Box>)
			}
		</>
	);
};

export default ServiceForm;
