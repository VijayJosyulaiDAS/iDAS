import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import { motion } from 'framer-motion';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function UpcomingProductionHeader({onUpload, jsonData}) {
    const [loading, setLoading] = React.useState(false);
    const [isDownload, setIsDownloading] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [file, setFile] = useState<any>();
    const [selectedFile,setSelectedFile] = useState({name:''})

    const handleOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setSelectedFile({name:''})
        setFile(null)
        setOpen3(false);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error(' Please select a file.', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (!file.name.endsWith('.xlsx')) {
            toast.error('Please select a valid Excel file (.xlsx).', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoading(true)
            await axios.post(`${import.meta.env.VITE_LOCAL_BASE_URL}/create_upcoming_production`, formData, {
            }).then((response) =>{
                setUpdated(!updated)
                if (response.status === 200) {
                    onUpload(true)
                    setLoading(false)
                    toast.success('Data inserted successfully.', {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    setLoading(false)
                    toast.error('Failed to insert data.', {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    throw new Error('Failed to insert data.');
                }
            })
        } catch (error) {
            setLoading(false)
        }
    };

    const handleFileChange = (e) => {
        if(e.target.files[0] === undefined){
            setSelectedFile({name:''});
        }
        else{
            setSelectedFile({name:e.target.files[0]?.name});
        }
        setFile(e.target.files[0]);
    };

    const handleExport = () =>{
        setIsDownloading(true);
        const worksheetData = jsonData.map(item => ({
            'schedule_start_date - Year': item.schedule_start_date_year? item.schedule_start_date_year : '', // Example mapping, adjust as per your data structure
            'schedule_start_date - Month': item.schedule_start_date_month ? item.schedule_start_date_month : '',
            'schedule_start_date - Day': item.schedule_start_date_day ? item.schedule_start_date_day.toString() : '',
            Plant: item.plant ? item.plant.toString() : '',
            'Line Code': item.line_code ? item.line_code.toString() : '',
            'Prod id': item.prod_id ? item.prod_id.toString() : '',
            'Prod Name': item.prod_name ? item.prod_name.toString() : '',
            'Plan Order Qty': item.plan_order_qty ? item.plan_order_qty.toString() : '',
            'Plan Order Qty (BOUM)': item.plan_order_qty_boum ? item.plan_order_qty_boum.toString() : '',
            'order_num': item.order_num ? item.order_num.toString() : ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, "upcoming_production.xlsx");
        setIsDownloading(false);
    }

    return (
        <div className="p-24 sm:p-32 w-full border-b-1">
            <ToastContainer style={{marginTop: '50px'}}/>
            <div className="flex flex-row justify-between">
                <motion.span
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                >
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">
                        Upcoming Production Data
                    </Typography>
                </motion.span>
                <motion.span
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                >
                    <Button variant="contained"
                            className="whitespace-nowrap mx-4 gap-10 bg-blue hover:bg-blue text-white hover:text-white"
                            onClick={handleExport} disabled={isDownload}>
                        {isDownload ?
                            <CircularProgress size={24} color="inherit"/> :
                            <FuseSvgIcon size={24}
                                         className="text-48 text-white">heroicons-outline:download</FuseSvgIcon>
                        }
                        Download
                    </Button>
                    <Button variant="contained"
                            className="whitespace-nowrap mx-4 gap-10 bg-blue hover:bg-blue text-white hover:text-white"
                            onClick={handleOpen3} disabled={loading}>
                        {loading ?
                            <CircularProgress size={24} color="inherit"/> :
                            <FuseSvgIcon size={24} className="text-48 text-white">heroicons-outline:upload</FuseSvgIcon>
                        }
                        Upload File
                    </Button>
                </motion.span>
            </div>
            <div>
                <Dialog
                    open={open3}
                    onClose={handleClose3}
                    PaperProps={{
                        component: 'form', onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            handleUpload();
                            handleClose3();
                        },
                        sx: {minWidth: '40vw', minHeight: '40vh'}
                    }}
                >
                    <DialogTitle className="bg-blue-500 text-white">Upload Upcoming Production</DialogTitle>
                    <DialogContent className="mt-8 flex justify-center items-center">
                        <div>
                            <input type="file" onChange={handleFileChange} accept=".xlsx"
                                   style={{display: 'none'}} id="file-input" onDragLeave={handleFileChange}/>
                            <label htmlFor="file-input"
                                   style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       flexDirection: 'column',
                                       cursor: 'pointer'
                                   }}>
                                <IconButton component="span">
                                    <CloudUploadIcon/>
                                </IconButton>
                                {selectedFile.name !== '' ?
                                    <h2 style={{color: "green"}}>{selectedFile.name}</h2> :
                                    <h2>Choose An Excel File</h2>}
                            </label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className="mb-8 mr-16">
                            <Button onClick={handleClose3} color="primary" variant="outlined">
                                Close
                            </Button>
                            <Button type="submit" variant="contained"
                                    className="bg-blue text-white hover:bg-blue ml-8">
                                Upload Excel
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default UpcomingProductionHeader;