import { styled } from '@mui/material/styles';
import { useRef} from "react";
import MrpContent from "./mrpContent";
import MrpHeader from "./mrpHeader";
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
function MrpPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <MrpHeader/>
            }
            ref={pageLayout}
            content={<MrpContent />}
            scroll="content"
        />
    );
}

export default MrpPage;
