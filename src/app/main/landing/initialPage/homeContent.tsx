import Typography from "@mui/material/Typography";
import {useAppSelector} from "app/store/hooks";
import {selectUser} from "../../../auth/user/store/userSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";


function homeContent() {

    const user = useAppSelector(selectUser);
    const [useCases, setUseCases] = useState([]);
    const[openCount, setOpenCount] = useState<number>(0);
    const [greet, setGreet] = useState('');
    const [loading, setLoading] = useState(false);


    const getGreet = () => {
        const myDate = new Date();
        const hrs = myDate.getHours();
        if (hrs < 12)
            setGreet('Good Morning')
        else if (hrs >= 12 && hrs <= 17)
            setGreet('Good Afternoon')
        else if (hrs >= 17 && hrs <= 24)
            setGreet('Good Evening')
    }

    const fetchUseCases = async () => {
        setLoading(true);
        let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
        // Define the order
        const order = ["Supplier PO Amendments" ,"Firm Zone Production Adjustments"];

        // Separate the items based on the order
        const orderedItems = response.data.data.filter(item => order.includes(item.title));
        const remainingItems = response.data.data.filter(item => !order.includes(item.title));

        // Combine them in the desired order
        const result = [
            ...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
            ...remainingItems
        ];
        setUseCases(result)
        setLoading(false)
        setOpenCount(response.data.open)
    }

    const navigate = useNavigate();

    useEffect(() => {
        getGreet()
        fetchUseCases()
    }, []);

    const handleClick = (event) =>{
        navigate('/apps/landing')
    }

    const handleCardClick = (event) =>{
        console.log(event)
        navigate(`/apps/landing/${event.id}`, { state: useCases })
    }


    return (
        <div className='w-full h-full' style={{
            backgroundImage: `url('assets/images/blog-bg-2-colors.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}>
            <div className='w-full h-full flex flex-col justify-between' style={{
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '80%',
                    backgroundImage: `url('assets/images/iDAS_Logo-removebg.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "40%", // Adjust size here
                    opacity: 0.3 // Adjust opacity here
                }}></div>
                <div>
                    <Typography
                        className="text-2xl md:text-5xl font-semibold m-96 tracking-tight leading-7 flex flex-col justify-between gap-10 md:leading-snug truncate">
                        <span>{`${greet},`}</span>
                        <span
                            className='text-4xl md:text-5xl font-bold tracking-tight leading-7 flex flex-col justify-between gap-10 md:leading-snug truncate'>{`${user.data.displayName}!`}</span>
                    </Typography>
                </div>
                <div className='w-full'>
                    <div
                        className='flex font-bold ml-10 relative w-full justify-start items-end pb-20 pl-20 pr-20 gap-20'>
                        <div onClick={handleClick}
                             className='flex gap-8 justify-center cursor-pointer hover:bg-transparent items-center'>{`Use Cases (${useCases.length})`}<FuseSvgIcon
                            size={24} className='text-blue-500'>heroicons-outline:arrow-narrow-right</FuseSvgIcon>
                        </div>
                    </div>
                    <div className='flex w-full justify-start items-end pb-20 pl-20 pr-20 gap-20'>
                        {loading ? (
                            <FuseLoading></FuseLoading>
                        ) : (
                            useCases.map((useCase, index) => (
                                <div key={index} onClick={() => handleCardClick(useCase)}
                                     className="card hover:scale-105 hover:filter transition duration-300 ease-in-out hover relative cursor-pointer flex lg:flex-col md:flex-row sm:flex-row shadow-2xl bg-white gap-10 lg:w-1/4 sm:w-2/4 md:w-2/4 rounded-2xl mb-32 m-6 overflow-hidden">
                                    <div className="flex items-center text-blue-500 justify-between px-8 pt-12">
                                        <Typography
                                            className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                                        >
                                            {useCase.title}
                                        </Typography>
                                    </div>
                                    <div className="flex justify-between gap-10 flex-col">
                                        <div
                                            className="text-md font-medium md:mr-24  md:ml-24  line-clamp-2">{useCase.description}</div>
                                        <Typography
                                            className="text-lg md:pr-24 md:pl-24 md:pb-24 font-medium flex flex-col pt-20 tracking-tight leading-6 truncate"
                                            color="text.secondary"
                                        >
                                            <span className="truncate"></span><b
                                            className="px-8 text-blue-500">{String(`${openCount}`)}</b>
                                            <span className="truncate"></span>{'Open'}<b className="px-8"></b>
                                        </Typography>
                                    </div>
                                </div>
                            ))
                        )
                        }
                    </div>                </div>
            </div>

        </div>
    );

}

export default homeContent;