import Home from "./initialPage/home";
import LandingPage from "./landingPage/landingPage";
import {Navigate} from "react-router-dom";
import SelectRecommendationMessage from "./recommendationBox/SelectRecommendationMessage";
import MailDetails from "./recommendationBox/recommendation/RecommendationDetails";
import LandingPageContent from "./landingPage/landingPageContent";


const LandingConfig = {
    settings: {
        layout: {}
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
                    element: <LandingPageContent/>
                }
            ]
        }
    ]
};

export default LandingConfig;