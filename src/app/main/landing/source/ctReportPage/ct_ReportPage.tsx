import { styled } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import Ct_ReportContent from "./ct_ReportContent";
import Ct_ReportHeader from "./ct_ReportHeader";
import FusePageSimple from "@fuse/core/FusePageSimple";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {}
}));

/**
 * Ct_ReportPage.
 */
function Ct_ReportPage() {
    const pageLayout = useRef(null);
    const [uploaded, setUpload] = useState(false)
    const [jsonData, setJsonData] = useState(null);    console.log(uploaded)

    const handleUpload = (item) => {
        setUpload(true)
    };
    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/ct_report`);
            setJsonData(response.data.data);
        } catch (error) {
            setJsonData([])
            toast.error(`Something Went Wrong while fetching data.`, {autoClose: 500})
        }
    };
    useEffect(() => {
        fetchData();
    }, [uploaded]);


    return (
        <Root
            header={
                <Ct_ReportHeader onUpload={handleUpload} jsonData={jsonData}/>
            }
            ref={pageLayout}
            content={<Ct_ReportContent jsonData={jsonData}/>}
            scroll="content"
        />
    );
}

export default Ct_ReportPage;
