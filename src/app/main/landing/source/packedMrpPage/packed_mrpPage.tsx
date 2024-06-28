import { styled } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import Packed_mrpContent from "./packed_mrpContent";
import Packed_mrpHeader from "./packed_mrpHeader";
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
 * MrpPage.
 */
function Packed_mrpPage() {
    const pageLayout = useRef(null);
    const [uploaded, setUpload] = useState(false)
    const [jsonData, setJsonData] = useState(null);

    const handleUpload = (item) => {
        setUpload(true)
    };
    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/packed_mrp_data`);
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
                <Packed_mrpHeader onUpload={handleUpload} jsonData={jsonData}/>
            }
            ref={pageLayout}
            content={<Packed_mrpContent jsonData={jsonData}/>}
            scroll="content"
        />
    );
}

export default Packed_mrpPage;
