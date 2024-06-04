import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import LandingPageHeader from './landingPageHeader';
import LandingPageContent from './landingPageContent';
import LandingPageSideBar from './landingPageSideBar';

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
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const [selectedItem, setSelectedItem] = useState(null);

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
