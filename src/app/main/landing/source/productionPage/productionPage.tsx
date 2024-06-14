import { styled } from '@mui/material/styles';
import { useRef} from "react";
import ProductionContent from "./productionContent";
import ProductionHeader from "./productionHeader";
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
function ProductionPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <ProductionHeader/>
            }
            ref={pageLayout}
            content={<ProductionContent />}
            scroll="content"
        />
    );
}

export default ProductionPage;
