import { styled } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import PoContent from "./poContent";
import PoHeader from "./poHeader";
import FusePageSimple from "@fuse/core/FusePageSimple";
import axios from "axios";

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
function PoPage() {
    const pageLayout = useRef(null);
    const [uploaded, setUpload] = useState(false)
    const [jsonData, setJsonData] = useState(null);

    const handleUpload = (item) => {
        setUpload(true)
    };
    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/pos_data`);
            setJsonData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch production data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [uploaded]);

    return (
        <Root
            header={
                <PoHeader onUpload={handleUpload} jsonData={jsonData}/>
            }
            ref={pageLayout}
            content={<PoContent jsonData={jsonData}/>}
            scroll="content"
        />
    );
}

export default PoPage;
