import { styled } from '@mui/material/styles';
import { useRef} from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import UpcomingProductionHeader from "./upcomingProductionHeader";
import UpcomingProductionContent from "./upcomingProductionContent";

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
function UpcomingProductionPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <UpcomingProductionHeader/>
            }
            ref={pageLayout}
            content={<UpcomingProductionContent />}
            scroll="content"
        />
    );
}

export default UpcomingProductionPage;
