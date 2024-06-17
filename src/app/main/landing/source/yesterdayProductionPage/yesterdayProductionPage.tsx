import { styled } from '@mui/material/styles';
import { useRef} from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import YesterdayProductionHeader from "./yesterdayProductionHeader";
import YesterdayProductionContent from "./yesterdayProductionContent";

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
function YesterdayProductionPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <YesterdayProductionHeader/>
            }
            ref={pageLayout}
            content={<YesterdayProductionContent />}
            scroll="content"
        />
    );
}

export default YesterdayProductionPage;
