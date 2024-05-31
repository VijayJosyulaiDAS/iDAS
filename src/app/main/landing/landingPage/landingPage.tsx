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
 * The CardedWithSidebarsContentScroll page.
 */
function LandingPage() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
    const [selectedItem, setSelectedItem] = useState(null);

    // Define callback function to receive click events
    const handleSidebarItemClick = (item) => {
        // Pass the clicked item data to LandingPageContent
        // For example, you can set it to the state and pass the state to LandingPageContent
        // Here, I'm just logging the item for demonstration
        console.log("Clicked item:", item);
        setSelectedItem(item)
    };

    useEffect(() => {
        setLeftSidebarOpen(!isMobile);
        setRightSidebarOpen(!isMobile);
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
            rightSidebarOnClose={() => {
                setRightSidebarOpen(false);
            }}
            scroll="content"
        />
    );
}

export default LandingPage;
