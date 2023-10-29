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
import Header from "../../header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import ILaundryService, { DRY_BIT, IRON_BIT, ProcessLaundryServiceDisplayName, SetLaundryServiceBits, WASH_BIT } from '../../models/ILaundryService';
import { GetLaundryServiceById } from '../../../axios';
import IPriceMenu from '../../models/IPriceMenu';

const columns: GridColDef<IPriceMenu>[] = [
    { field: "name", headerName: "Nama", width: 170 },
    { field: "priceDisplay", headerName: "Harga", width: 170 },
    { field: "pricingOptionDisplay", headerName: "Satuan", width: 170 },
    { field: "processingTimeDisplay", headerName: "Waktu Pengerjaan", width: 170 },
    { field: "deliveryOptionDisplay", headerName: "Opsi Pengerjaan", width: 170 },
];

const ServiceForm = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [laundryService, setLaundryService] = useState<ILaundryService | undefined>(undefined);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	let LaundryServiceId = params.id;
	if (typeof LaundryServiceId === 'undefined') {
		return <div>Invalid Request, please reload.</div>
	}

	useEffect(() => {
		const fetchLaundryService = async () => {
			var response = await GetLaundryServiceById(LaundryServiceId!);
			
			var data: ILaundryService = response.data;
			ProcessLaundryServiceDisplayName(data);
			setLaundryService(data);
		};

		fetchLaundryService().catch(console.error);
		setIsLoading(false);
	}, [])

	if (isLoading) {
		// Return something, possibly loading animation icon.
		return;
	}

	const OnClickEdit = () => {
		setIsEditMode(true);
	}

	const OnClickCancel = () => {
		setIsEditMode(false);
	}

	const HandleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, BIT: number) => {
		if (laundryService) {
			let result = 0;
			if (!event.target.checked) {
				result = laundryService.laundryProcess & ~(BIT);
			} else {
				result = laundryService.laundryProcess |= BIT;
			}
				
			setLaundryService({
				...laundryService,
				laundryProcess: result
			});
		}
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
				
				<TextField required label="Nama" size="small" value={laundryService?.name || ''} />
				<FormGroup>
					<FormControlLabel control={<Checkbox checked={laundryService ? (laundryService.laundryProcess & WASH_BIT) == WASH_BIT : false} onChange={(event) => HandleCheckbox(event, WASH_BIT)} disabled={!isEditMode} />} label='Cuci' />
					<FormControlLabel control={<Checkbox checked={laundryService ? (laundryService.laundryProcess & DRY_BIT) == DRY_BIT : false} onChange={(event) => HandleCheckbox(event, DRY_BIT)} disabled={!isEditMode} />} label='Kering' />
					<FormControlLabel control={<Checkbox checked={laundryService ? (laundryService.laundryProcess & IRON_BIT) == IRON_BIT : false} onChange={(event) => HandleCheckbox(event, IRON_BIT)} disabled={!isEditMode} />} label='Setrika' />
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
		</>
	);
};

export default ServiceForm;
