import { styled } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import M1Content from "./m1Content";
import M1Header from "./m1Header";
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
 * RecommendationDetailPage.
 */
function M1Page() {const pageLayout = useRef(null);
    const [uploaded, setUpload] = useState(false)
    const [jsonData, setJsonData] = useState(null);    console.log(uploaded)

    const handleUpload = (item) => {
        setUpload(true)
    };
    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/m1_data`);
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
                <M1Header onUpload={handleUpload} jsonData={jsonData}/>
            }
            ref={pageLayout}
            content={<M1Content jsonData={jsonData}/>}
            scroll="content"
        />
    );
}

export default M1Page;
