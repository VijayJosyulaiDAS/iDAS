import { styled } from '@mui/material/styles';
import { useRef} from "react";
import Ct_ReportContent from "./ct_ReportContent";
import Ct_ReportHeader from "./ct_ReportHeader";
import FusePageSimple from "@fuse/core/FusePageSimple";

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
function Ct_ReportPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <Ct_ReportHeader/>
            }
            ref={pageLayout}
            content={<Ct_ReportContent />}
            scroll="content"
        />
    );
}

export default Ct_ReportPage;
