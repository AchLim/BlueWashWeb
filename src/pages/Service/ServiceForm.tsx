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
	AlertProps,
	Snackbar,
	Alert,
	Slide,
} from "@mui/material";
import Header from "../../components/header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import ILaundryService from '../../components/models/ILaundryService';
import { GetLaundryServiceById, UpdateLaundryService } from '../../axios';
import IPriceMenu from '../../components/models/IPriceMenu';

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
	const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);


	let LaundryServiceId = params.id;
	if (typeof LaundryServiceId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchLaundryService = async () => {
			var response = await GetLaundryServiceById(LaundryServiceId!);

			var data: ILaundryService = response.data;
			setLaundryService(data);
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

		var response = await UpdateLaundryService(LaundryServiceId!, laundryService);
		if (response.status == 201) {
			setSnackbar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setLaundryService(response.data);
		} else {
			setSnackbar({ children: 'Data gagal disimpan!', severity: 'error' });
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
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 25 },
								},
							}}
							autoHeight
							pageSizeOptions={[5, 25]}
						/>
					</Box>)
			}
			{
				!!snackbar && (
					<Snackbar open
						anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
						key={'center' + 'bottom'}
						onClose={() => setSnackbar(null)}
						autoHideDuration={4000}
						TransitionComponent={(props) => <Slide {...props} direction="up" />}
					>
						<Alert {...snackbar} onClose={() => setSnackbar(null)} sx={{ width: '100%' }} />
					</Snackbar>
				)
			}
		</>
	);
};

export default ServiceForm;
