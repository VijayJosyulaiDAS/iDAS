import { styled } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import ProductionContent from "./productionContent";
import ProductionHeader from "./productionHeader";
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
function ProductionPage() {
    const pageLayout = useRef(null);
    const [uploaded, setUpload] = useState(false)
    const [jsonData, setJsonData] = useState(null);

    const handleUpload = (item) => {
        setUpload(true)
    };
    const fetchData = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/production_data`);
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
                <ProductionHeader  onUpload={handleUpload} jsonData={jsonData}/>
            }
            ref={pageLayout}
            content={<ProductionContent jsonData={jsonData} />}
            scroll="content"
        />
    );
}

export default ProductionPage;
