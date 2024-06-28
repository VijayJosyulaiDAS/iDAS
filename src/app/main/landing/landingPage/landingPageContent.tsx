import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Box} from "@mui/system";
import {Navigate, useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {useAppSelector} from "app/store/hooks";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {DialogContentText} from "@mui/material";
import {selectUser} from "../../../auth/user/store/userSlice";


/**
 * LandingPage Content
 */

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function LandingPageContent(props) {
    const {selectedData, useCasesData} = props
    const [openCount, setOpenCount] = useState<number>(0);
    const [closeCount, setCloseCount] = useState<number>(0);
    const [rowData, setRowData] = useState(null);
    const [filteredData, setFilterData] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [colDefs, setColDefs] = useState([]);
    const [useCases, setUseCases] = useState([]);
    const gridRef = useRef(null);
    const [selectedRows, setSelectedRows] = useState([])
    const user = useAppSelector(selectUser);
    const [openDialog, setOpenDialog] = useState(false);
    const [openText, setOpenText] = useState(false)
    const [reason, setReason] = React.useState('');
    const [openReason, setOpenReason] = useState(false)
    const [description, setDescription] = useState('')


    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendationByUseCase?id=${selectedData.id}`);
            const order = ["Firm Zone Production Adjustments", "Supplier PO Amendments"];
            const orderedItems = response.data.data.filter(item => order.includes(item.title));
            const remainingItems = response.data.data.filter(item => !order.includes(item.title));
            const result = [
                ...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
                ...remainingItems
            ];
            setRowData(result);
            setOpenCount(response.data.open);
            setCloseCount(response.data.close);
            tabData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUseCases = async () => {
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
        setUseCases(response.data.data)
    }

    useEffect(() => {
        setUseCases(useCasesData)
    }, []);

    useEffect(() => {
        if (selectedData != null) {
            const columnDefinitions = {
                "Firm Zone Production Adjustments": [
                    {field: "priority", headerName: "Priority", filter: true},
                    {field: "due_date", headerName: "Due Date", filter: true},
                    {
                        field: "",
                        headerCheckboxSelection: true,
                        checkboxSelection: true,
                        pinned: true,
                        showDisabledCheckboxes: true,
                        width: 60
                    },
                    {field: "description", headerName: "Description", filter: true},
                    {field: "plant_code", headerName: "Plant Code", filter: true},
                    {field: "firm_zone_time", headerName: "Firm Zone Time", filter: true},
                    {field: "total_adjustment", headerName: "Total Adjustment", filter: true},
                    {field: "created_at", headerName: "Recommendation Date", filter: true}
                ],
                "Supplier PO Amendments": [
                    {field: "material_code", headerName: "Material Code", filter: true},
                    {
                        field: "",
                        headerCheckboxSelection: true,
                        checkboxSelection: true,
                        pinned: true,
                        showDisabledCheckboxes: true,
                        width: 60
                    },
                    {
                        field: "priority",
                        headerName: "Priority",
                        filter: true,
                        cellRenderer: params => params.value || 'High'
                    },
                    {
                        field: "po_number",
                        headerName: "PO Number",
                        filter: true,
                        cellRenderer: params => parseInt(params.value) || 'NEW PO'
                    },
                    {
                        field: "due_date",
                        headerName: "Due Date",
                        filter: true,
                        cellRenderer: params => params.value?.split('T')[0]
                    },
                    {
                        field: "created_at",
                        headerName: "Recommendation Date",
                        filter: true,
                        cellRenderer: params => params.value?.split('T')[0]
                    },
                    {field: "order_type", headerName: "Order Type", filter: true},
                    {field: "po_quantity_value", headerName: "Quantity", filter: true},
                    {field: "supplier_code", headerName: "Supplier Code", filter: true, hide: true},
                    {field: "lead_time", headerName: "Lead Time", filter: true}
                ],
                "Realtime Supply Confirmation for Upsides": [
                    {
                        field: "",
                        headerCheckboxSelection: true,
                        checkboxSelection: true,
                        pinned: true,
                        showDisabledCheckboxes: true,
                        width: 60
                    },
                    {
                        field: "priority",
                        headerName: "Priority",
                        filter: true,
                        cellRenderer: params => params.value || 'High'
                    },
                    {field: "due_date", headerName: "Due Date", filter: true},
                    {field: "description", headerName: "Description", filter: true},
                    {field: "change_in_demand", headerName: "Change In Demand", filter: true},
                    {field: "open_orders", headerName: "Open Orders", filter: true},
                    {field: "in_transit_orders", headerName: "In Transit Orders", filter: true},
                    {field: "created_at", headerName: "Recommendation Date", filter: true}
                ],
                "Total Recommendations": [
                    {
                        field: "priority",
                        headerName: "Priority",
                        filter: true,
                        width: 350,
                        cellRenderer: params => params.value || 'High'
                    },
                    {field: "due_date", headerName: "Due Date", filter: true, width: 350},
                    {
                        field: "use_case_id",
                        headerName: "Use Case Name",
                        filter: true,
                        width: 400,
                        cellRenderer: params => {
                            const matchingUseCase = useCases.find(item => item.id === params.value);
                            return matchingUseCase ? matchingUseCase.title : '';
                        }
                    },
                    {field: "created_at", headerName: "Recommendation Date", filter: true, width: 350}
                ]
            };
            const selectedColumns = columnDefinitions[selectedData.title] || [];
            setColDefs([...selectedColumns]);
            fetchRecommendations();
        }
    }, [selectedData]);


    const tabData = (data) => {
        if (tabValue == 0) {
            const filteredData = data?.filter(item => item.active);
            setFilterData(filteredData);
        } else {
            const filteredData = data.filter(item => !item.active);
            setFilterData(filteredData);
        }
    };

    useEffect(() => {
        tabData(rowData);
    }, [tabValue]);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        gridRef.current = params.api;
    };

    const handleRowClick = (params) => {
        localStorage.setItem('recommendationData', JSON.stringify(params.data));
        navigate(`/apps/recommendations`);
    };

    function handleChangeTab(event: React.SyntheticEvent, value: number) {
        setTabValue(value);
    }

    function handleCloseDialog() {
        setOpenReason(false);
    }

    const handleSaveSelection = async (e) => {
        e.preventDefault();
        selectedRows.forEach(row => {
            let data = {
                use_case_id: row.use_case_id,
                active: false,
                action_owner: user.data.email,
                po_number: row.po_number,
                best_alternative: row.best_alternative,
                recommendation_action: 'Dismiss',
                user_desc: description == '' ? reason : description
            }
            updateRecommendation(data, row.id)
        })
        setOpenReason(false);
    }

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value == 'Others') {
            setOpenText(true)
            setReason(event.target.value);
        } else {
            setOpenText(false)
            setReason(event.target.value);
        }
    };

    const getSelectedRows = () => {
        setOpenDialog(true)
    };

    const onSelectionChanged = () => {
        const selectedRows = gridRef.current.getSelectedRows();
        setSelectedRows(selectedRows);
    };

    const updateRecommendation = async (data, id) => {
        let response = await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/update_recommendations?id=${id}`, data);
    }

    const handleReject = () => {
        setOpenDialog(false);
        setOpenReason(true);
    }
    const handleClose = () => {
        setOpenDialog(false);
        setOpenReason(false);
    }
    const handleSubmit = () => {
        setLoading(true)
        selectedRows.forEach(row => {
            let data = {
                use_case_id: row.use_case_id,
                recommendation_action: 'Accept',
                action_owner: user.data.email,
                po_number: row.po_number,
                best_alternative: row.best_alternative,
                user_desc: description,
                active: false
            }
            updateRecommendation(data, row.id)
        })
        setLoading(false)
        setOpenDialog(false);
        setOpenReason(false);
    }

    return (
        <div className="flex-auto w-full h-full p-24 sm:p-40">
            {selectedData ? (
                <div className="ag-theme-quartz" style={{height: 680}}>
                    <div className='m-5 flex w-full gap-80 justify-between flex-row'>
                        <span className='font-semibold'>{`${selectedData.title.split('-')[0]}`}</span>
                        <div className='flex flex-row'>
                            <Tabs
                                value={tabValue}
                                onChange={handleChangeTab}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="scrollable"
                                scrollButtons={false}
                                className="px-24 min-h-40"
                                classes={{indicator: 'flex justify-center bg-transparent h-full'}}
                                TabIndicatorProps={{
                                    children: (
                                        <Box
                                            sx={{bgcolor: 'text.disabled'}}
                                            className="w-full h-full rounded-full opacity-20"
                                        />
                                    )
                                }}
                            >
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                    disableRipple
                                    label={`Open ${openCount}`}
                                />
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                    disableRipple
                                    label={`Closed ${closeCount}`}
                                />
                            </Tabs>
                            {
                                selectedRows.length > 0 &&
                                <Button onClick={getSelectedRows}
                                        className=""
                                        variant="contained"
                                        color="secondary"
                                >
                                    <FuseSvgIcon size={20}>heroicons-outline:check-circle</FuseSvgIcon>
                                    <span className="mx-4 sm:mx-8">Take Action</span>
                                </Button>
                            }
                        </div>
                    </div>
                    <AgGridReact
                        rowData={filteredData}
                        pagination={true}
                        paginationPageSize={100}
                        suppressMenuHide={true}
                        onGridReady={onGridReady}
                        suppressRowClickSelection={true}
                        columnDefs={colDefs}
                        rowSelection={"multiple"}
                        onRowClicked={handleRowClick}
                        onSelectionChanged={onSelectionChanged}
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <FuseLoading></FuseLoading>
                </div>
            )}
            <div>
                <BootstrapDialog open={openReason} onClose={handleCloseDialog}
                                 className="hidden sm:flex items-center justify-center text-white"
                                 aria-labelledby="customized-dialog-title"
                                 scroll="body" PaperProps={{
                    sx: {minWidth: "28vw", maxWidth: "60vw"}
                }}>
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        Rejection Reason
                    </DialogTitle>
                    <form onSubmit={handleSaveSelection} className="flex flex-col">
                        <DialogContent classes={{root: 'p-16 pb-0 sm:p-32 sm:pb-0'}} dividers>
                            <div className="flex flex-col justify-center gap-20 items-center">
                                <FormControl fullWidth sx={{minWidth: 170}} size="medium">
                                    <InputLabel id="demo-simple-select-helper-label">Choose a reason</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={reason}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Insufficient capacity at supplier end'}>Insufficient capacity
                                            at supplier end.</MenuItem>
                                        <MenuItem value={'Lack of WHS Storage'}>Lack of WHS Storage.</MenuItem>
                                        <MenuItem value={'Transit time greater than LT'}>Transit time greater than
                                            LT.</MenuItem>
                                        <MenuItem value={'Others'}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                {
                                    openText && (
                                        <FormControl fullWidth sx={{
                                            width: '100%',
                                            height: "20vh",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: 'center'
                                        }}>
                                            <TextField
                                                className='w-full h-full'
                                                id="standard-multiline-static"
                                                label="Description"
                                                multiline
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                minRows={8}
                                                placeholder='Please provide a valid description'
                                            />
                                        </FormControl>
                                    )
                                }
                            </div>
                        </DialogContent>
                        <DialogActions className="flex sm:flex-row   sm:py-24 px-24">
                            <Button color="primary" variant="outlined"
                                    onClick={handleCloseDialog}>Close</Button>
                            <Button type="submit" color="primary" variant="outlined"
                                    className=" ml-8">Submit</Button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='flex justify-between'>
                    <div className='flex flex-row w-full gap-5 items-center'>
                        <FuseSvgIcon className='rounded-full'>heroicons-outline:question-mark-circle</FuseSvgIcon>
                        <span>Confirm Your Decision</span>
                    </div>
                    <FuseSvgIcon onClick={handleClose}
                                 className='rounded-full cursor-pointer'>heroicons-outline:x</FuseSvgIcon>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm whether you want to accept or reject the suggestions. This decision is final and
                        cannot be reversed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{justifyContent: 'end', padding: '16px 24px'}}>
                    <div>
                        <Button onClick={handleReject} variant="outlined" color="secondary" style={{marginRight: 8}}>
                            Reject
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="secondary" autoFocus>
                            Accept
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>


    );
}

export default LandingPageContent;
