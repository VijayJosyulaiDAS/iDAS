import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
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


    const fetchUseCases = async () => {
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
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
            content={<LandingPageContent selectedData={selectedItem} />}
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => {
                setLeftSidebarOpen(false);
            }}
            leftSidebarContent={<LandingPageSideBar onItemClick={handleSidebarItemClick} />}
            leftSidebarWidth={300}
            scroll="content"
        />
    );
}

export default LandingPage;
