import { styled } from '@mui/material/styles';
import { useRef} from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import StockSummaryHeader from "./stockSummaryHeader";
import StockSummaryContent from "./stockSummaryContent";

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
function StockSummaryPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <StockSummaryHeader/>
            }
            ref={pageLayout}
            content={<StockSummaryContent />}
            scroll="content"
        />
    );
}

export default StockSummaryPage;
