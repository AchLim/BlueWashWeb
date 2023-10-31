import {
	Box,
	Breadcrumbs,
	Button,
	Stack,
	TextField,
	Typography,
	IconButton,
	Autocomplete,
} from "@mui/material";
import Header from "../../components/header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { useEffect, useState } from "react";
import { GetCustomers } from "../../axios";
import ICustomer from "../../components/models/ICustomer";

const columns: GridColDef[] = [
	{ field: "itemNo", headerName: "Item No", width: 170 },
	{ field: "itemName", headerName: "Item Name", width: 170 },
	{ field: "itemQuantity", headerName: "Item Quantity", width: 170 },
	{ field: "itemPrice", headerName: "Item Price", width: 170 },
	{ field: "subTotal", headerName: "Sub Total", width: 170 },
];

const rows = [
	{
		id: 1,
		itemNo: "I002",
		itemName: "Deterjen Rinso",
		itemQuantity: 20,
		itemPrice: 55_000.00.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
		subTotal: (20 * 55_000.00).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
	},
];
const TransactionForm = () => {
	const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>({
		id: "",
		customerName: "",
		customerCode: "",
		customerAddress: null,
		currencyId: null,
		currency: null
	});
	const [customers, setCustomers] = useState<Array<ICustomer>>([]);

	useEffect(() => {

		const GetAllCustomers = async () => {
			let response = await GetCustomers();
			if (response.status == 200) {
				let data: Array<ICustomer> = response.data;
				setCustomers(data);
			}
		}

		GetAllCustomers().catch(console.error);
	}, [])

	const HandleTransactionOnchange = (event: React.SyntheticEvent<Element, Event>, value: ICustomer | null) => {
		if (value)
			setSelectedCustomer(value);
		else {
			setSelectedCustomer({
				id: "",
				customerName: "",
				customerCode: "",
				customerAddress: null,
				currencyId: null,
				currency: null
			});
		}
	};

	return (
		<>
			<Header title="Purchase" />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Transaction</Typography>
					<Typography color="text.disabled">Tambah Transaksi</Typography>
				</Breadcrumbs>
			</Box>
			<Stack
				component="form"
				className="box-soft-shadow"
				p={3}
				borderRadius={3}
				spacing={2}
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

				<TextField required label="Purchase No" size="small" autoFocus />
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
					<DatePicker label="Tanggal Transaksi" defaultValue={dayjs()} />
				</LocalizationProvider> 

				<Autocomplete id="customerCode"
					getOptionLabel={(customer) => `${customer.customerCode} ${customer.customerName}`}
					options={customers}
					noOptionsText="Data pelanggan kosong."
					renderInput={(params) => <TextField {...params} label="Kode Pelanggan" />}
					isOptionEqualToValue={(option, value) => {
						return option.customerCode === value.customerCode
					}}
					onChange={HandleTransactionOnchange} />

				<TextField name="customerName" label="Nama Pelanggan" size="small" disabled value={selectedCustomer.customerName} />
				<Box display={"flex"}>
					<Box sx={{ marginRight: "auto" }}>
						<Button variant="outlined" color="warning">
							Delete
						</Button>
					</Box>
					<Box>
						<Button type="submit" variant="contained">
							Save
						</Button>
					</Box>
				</Box>
			</Stack>
			<Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
				<DataGrid
					rows={rows}
					columns={columns}
					getRowId={(row) => row?.id}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 25 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</Box>
		</>
	);
};

export default TransactionForm;
