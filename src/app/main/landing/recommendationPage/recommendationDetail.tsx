import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import RecommendationPageHeader from './recommendationHeader';
import RecommendationPageContent from './recommendationContent';
import {useEffect, useState} from "react";

const Root = styled(FusePageCarded)(() => ({
    '& .FusePageCarded-header': {},
    '& .FusePageCarded-toolbar': {},
    '& .FusePageCarded-content': {},
    '& .FusePageCarded-sidebarHeader': {},
    '& .FusePageCarded-sidebarContent': {}
}));

/**
 * RecommendationDetailPage.
 */
function RecommendationDetail() {

    return (
        <Root
            header={
                <RecommendationPageHeader/>
            }
            content={<RecommendationPageContent />}
            scroll="content"
        />
    );
}

export default RecommendationDetail;
