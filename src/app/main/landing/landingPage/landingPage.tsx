import {styled} from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {useEffect, useState} from 'react';
import LandingPageHeader from './landingPageHeader';
import LandingPageContent from './landingPageContent';
import LandingPageSideBar from './landingPageSideBar';
import {useParams} from "react-router-dom";
import axios from "axios";

const Root = styled(FusePageCarded)(() => ({
    '& .FusePageCarded-header': {},
    '& .FusePageCarded-toolbar': {},
    '& .FusePageCarded-content': {},
    '& .FusePageCarded-sidebarHeader': {},
    '& .FusePageCarded-sidebarContent': {}
}));

/**
 * LandingPage.
 */
function LandingPage() {
    const isMobile = true
    const {folderHandle} = useParams()

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const [selectedItem, setSelectedItem] = useState(null);
    const [useCases, setUseCases] = useState([]);


    const fetchUseCases = async () => {
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
        setUseCases(response.data.data)
        let data = response.data.data.filter((item) => item.id === folderHandle)
        setSelectedItem(data[0])
    }

    useEffect(() => {
        fetchUseCases()
    }, []);

    const handleSidebarItemClick = (item) => {
        setSelectedItem(item)
    };

    useEffect(() => {
        setLeftSidebarOpen(!isMobile);
    }, [isMobile]);

    return (
        <Root
            header={
                <LandingPageHeader
                    leftSidebarToggle={() => {
                        setLeftSidebarOpen(!leftSidebarOpen);
                    }}
                />
            }
            content={<LandingPageContent selectedData={selectedItem} useCasesData={useCases}/>}
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => {
                setLeftSidebarOpen(false);
            }}
            leftSidebarContent={<LandingPageSideBar data={selectedItem} onItemClick={handleSidebarItemClick}
                                                    useCasesData={useCases}/>}
            leftSidebarWidth={320}
            scroll="content"
        />
    );
}

export default LandingPage;
