import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import { motion } from 'framer-motion';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DialogActions from "@mui/material/DialogActions";
import {toast} from "react-toastify";
import axios from "axios";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";


function Packed_mrpHeader({onUpload, jsonData}) {
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
            await axios.post(`${import.meta.env.VITE_LOCAL_BASE_URL}/create_packed_mrp`, formData, {
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
            console.error(error);
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
            Plant: item.plant ? item.plant.toString() : '', // Example mapping, adjust as per your data structure
            Category: item.category ? item.category.toString() : '',
            'Material Desc': item.material_desc ? item.material_desc.toString() : '',
            'Material Code': item.material_code ? item.material_code.toString() : '',
            'MRP Controller': item.mrp ? item.mrp.toString() : '',
            'MRP Type': item.mrp_type ? item.mrp_type.toString() : '',
            'Availability Check': item.availability_check ? item.availability_check.toString() : '',
            'Rounding Value': item.rounding_value ? item.rounding_value.toString() : '',
            'Planned delivery tim': item.planned_delivery_time ? item.planned_delivery_time.toString() : '',
            'Goods receipt procc': item.good_receipt_procc ? item.good_receipt_procc.toString() : '',
            'Total replenishment': item.total_replenishment ? item.total_replenishment.toString() : '',
            'Safety stock': item.safety_stock ? item.safety_stock.toString() : '',
            'Safety Time': item.safety_time ? item.safety_time.toString() : '',
            'Procurement Type': item.procurement_type ? item.procurement_type.toString() : '',
            'Minimum Lot size': item.minimum_lot_size ? item.minimum_lot_size.toString() : '',
            'Base unit of measure': item.base_unit_of_measure ? item.base_unit_of_measure.toString() : '',
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, "Packed_MRP.xlsx");
        setIsDownloading(false);
    }

    return (
        <div className="p-24 sm:p-32 w-full border-b-1">
            <div className="flex flex-row justify-between">
                <motion.span
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                >
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">
                        Packed Material MRP
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
                    <DialogTitle className="bg-blue-500 text-white">Upload Packed MRP</DialogTitle>
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

export default Packed_mrpHeader;