import { styled } from '@mui/material/styles';
import { useRef} from "react";
import BomContent from "./bomContent";
import BomHeader from "./bomHeader";
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
function BomPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <BomHeader/>
            }
            ref={pageLayout}
            content={<BomContent />}
            scroll="content"
        />
    );
}

export default BomPage;
