import Home from "./initialPage/home";
import LandingPage from "./landingPage/landingPage";
import RecommendationDetail from "./recommendationPage/recommendationDetail";
import UpdateRecommendation from "./recommendationPage/modification/updateRecommendation";
import BomPage from "./source/bomPage/bomPage";
import M1Page from "./source/m1Page/m1Page";
import ProductionPage from "./source/productionPage/productionPage";
import MrpPage from "./source/mrpPage/mrpPage";
import PoPage from "./source/posPage/poPage";
import UpcomingProductionPage from "./source/upcomingProductionPage/upcomingProductionPage";
import StockSummaryPage from "./source/stockSummaryPage/stockSummaryPage";
import YesterdayProductionPage from "./source/yesterdayProductionPage/yesterdayProductionPage";
import UserPage from "./userManagement/userPage";
import Ct_ReportPage from "./source/ctReportPage/ct_ReportPage";
import Packed_mrpPage from "./source/packedMrpPage/packed_mrpPage";
import P3mPage from "./source/p3mPage/p3mPage";


const LandingConfig = {
    settings: {
        layout: {
            config:{
                leftSidePanel: {
                    display: true
                },
            }
        }
    },
    routes: [
        {
            path: 'home',
            element: <Home/>
        }, {
            path: '/apps/landing',
            children: [
                {
                    path: '',
                    element: <LandingPage/>
                },{
                    path: ':folderHandle',
                    element: <LandingPage/>
                }
            ]
        },{
        path: '/apps/recommendations',
        children: [
            {
                path: '',
                element: <RecommendationDetail/>,
            },{
                path: '/apps/recommendations/:recommendationId',
                element: <UpdateRecommendation/>,
            },
        ]
        },{
        path: '/apps/recommendations/update',
        element: <UpdateRecommendation/>
        },{
        path: '/apps/source/bom',
        element: <BomPage/>
        },
        {
        path: '/apps/source/m-1',
        element: <M1Page/>
        },
        {
        path: '/apps/source/production',
        element: <ProductionPage/>
        },
        {
        path: '/apps/source/mrp',
        element: <MrpPage/>
        },
        {
        path: '/apps/source/pos',
        element: <PoPage/>
        },
        {
        path: '/apps/source/upcoming_production',
        element: <UpcomingProductionPage/>
        },
        {
        path: '/apps/source/yesterday_production',
        element: <YesterdayProductionPage/>
        },
        {
        path: '/apps/source/stock_summary',
        element: <StockSummaryPage/>
        },
        {
        path: '/apps/source/ct_report',
        element: <Ct_ReportPage/>
        },
        {
        path: '/apps/source/packed_mrp',
        element: <Packed_mrpPage/>
        },
        {
        path: '/apps/source/p3m',
        element: <P3mPage/>
        },
        {
        path: '/apps/user_management',
        auth: ['admin'],
        element: <UserPage/>
        }
    ]
};

export default LandingConfig;