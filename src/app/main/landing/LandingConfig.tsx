import Detail from "./detail/detail";
import Home from "./initialPage/home";


const LandingConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: 'home',
            element: <Home/>
        }
    ]
};

export default LandingConfig;