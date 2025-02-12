import Typography from "@mui/material/Typography";
import {useAppSelector} from "app/store/hooks";
import {selectUser} from "../../../auth/user/store/userSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";


function homeContent() {

    const user = useAppSelector(selectUser);
    const [useCases, setUseCases] = useState([]);
    const [openCount, setOpenCount] = useState<number>(0);
    const [greet, setGreet] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('recents');
    const [favorite, setFavorite] = useState([])
    const [recent, setRecent] = useState([])

    useEffect(() => {
        const data = useCases.filter((item) => item.favorite)
        setFavorite(data)
        setRecent(useCases)
    }, [selectedTab]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };


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
        const order = ["Supplier PO Amendments", "Firm Zone Production Adjustments"];
        // Separate the items based on the order
        const orderedItems = response.data.data.filter(item => order.includes(item.title));
        const remainingItems = response.data.data.filter(item => !order.includes(item.title));

        // Combine them in the desired order
        const result = [
            ...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
            ...remainingItems
        ];
        const data = result.filter((item) => item.favorite)
        setFavorite(data)
        setUseCases(result)
        setRecent(result)
        setLoading(false)
        setOpenCount(response.data.open)
    }

    const navigate = useNavigate();

    useEffect(() => {
        getGreet()
        fetchUseCases()
    }, []);

    const handleClick = (event) => {
        navigate('/apps/landing')
    }
    const handleChange = async (data) => {
        let obj = {
            use_case_id: data.id,
            favorite: !data.favorite,
        }
        await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/update_useCases`, obj)
        fetchUseCases()
    }

    const handleCardClick = (event) => {
        navigate(`/apps/landing/${event.id}`, {state: useCases})
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
                    backgroundSize: "40%",
                    opacity: 0.3
                }}></div>
                <div className='flex justify-between'>
                    <Typography
                        className="font-semibold m-96 tracking-tight leading-7 flex flex-col justify-between gap-10 md:leading-snug truncate">
                        <span className='text-2xl md:text-5xl '>{`${greet},`}</span>
                        <span className='flex flex-col justify-between gap-10 md:leading-snug truncate'>
                            <span
                                className='text-4xl md:text-5xl font-bold tracking-tight leading-7'>{`${user.data.displayName}!`}</span>
                            <span className='text-2xl'>{user.data.business_unit_name}</span>
                        </span>
                    </Typography>
                    <div
                        className="m-12 w-1/4 flex lg:flex-col justify-center items-center md:flex-row sm:flex-row  overflow-x-scroll">
                        <div className="relative flex w-full items-start justify-center gap-20 pt-32">
                            <div
                                className={`px-16 cursor-pointer rounded-2xl flex text-sm p-5 gap-10 font-medium text-blue-500 tracking-tight leading-6 truncate ${selectedTab === 'recents' ? 'bg-white' : ''}`}
                                onClick={() => handleTabClick('recents')}>
                                <FuseSvgIcon className="text-48" size={24}
                                             color="action">material-twotone:history</FuseSvgIcon>
                                <span>Recents</span>
                            </div>
                            <div
                                className={`px-16 cursor-pointer rounded-2xl flex text-sm p-5 gap-10 font-medium text-blue-500 tracking-tight leading-6 truncate ${selectedTab === 'favorites' ? 'bg-white' : ''}`}
                                onClick={() => handleTabClick('favorites')}>
                                <FuseSvgIcon className="text-48" size={22}
                                             color="action">heroicons-outline:star</FuseSvgIcon>
                                <span>Favorites</span>
                            </div>
                        </div>
                        <Paper
                            className="m-20 w-3/4 max-h-auto relative flex justify-start items-center lg:flex-col md:flex-row sm:flex-row"
                            style={{height: "70%"}}>
                            <List className="py-0 mt-8 divide-y w-full">
                                {
                                    loading ? (
                                        <FuseLoading></FuseLoading>
                                    ) : (
                                        selectedTab === 'recents' ? (
                                            recent.length > 0 ? (
                                                recent.map((item, index) => (
                                                    <ListItem key={index} className="px-0 w-full cursor-pointer"
                                                              onClick={() => handleCardClick(item)}>
                                                        <ListItemText className='flex'
                                                                      classes={{root: 'px-8', primary: 'font-medium'}}
                                                                      primary={
                                                                          <span
                                                                              className="flex items-center flex-auto ">
                                              <FuseSvgIcon size={20}>
                                                  material-twotone:history
                                              </FuseSvgIcon>
                                              <div className="mx-6 text-md flex flex-row">
                                                  {item.title}
                                              </div>
                                          </span>
                                                                      }
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton aria-label="more" size="large"
                                                                        onClick={() => handleCardClick(item)}>
                                                                <FuseSvgIcon>heroicons-solid:chevron-right</FuseSvgIcon>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <div className="px-8 py-4 text-center text-gray-500">
                                                    No data found
                                                </div>
                                            )
                                        ) : (
                                            favorite.length > 0 ? (
                                                favorite.map((item, index) => (
                                                    <ListItem key={index}
                                                              className="px-0 w-full flex items-start justify-start"
                                                              onClick={() => handleCardClick(item)}>
                                                        <ListItemText className='flex'
                                                                      classes={{root: 'px-8', primary: 'font-medium'}}
                                                                      primary={
                                                                          <span
                                                                              className="flex items-start flex-auto justify-start">
                                              <FuseSvgIcon size={20}>
                                                  heroicons-solid:star
                                              </FuseSvgIcon>
                                              <div className="mx-6 text-md flex flex-row">
                                                  {item.title}
                                              </div>
                                          </span>
                                                                      }
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton aria-label="more" size="large"
                                                                        onClick={() => handleCardClick(item)}>
                                                                <FuseSvgIcon>heroicons-solid:chevron-right</FuseSvgIcon>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <div
                                                    className="flex w-full h-full items-center justify-center text-gray-500">
                                                    <div>No data found</div>
                                                </div>
                                            )
                                        )
                                    )
                                }

                            </List>

                        </Paper>
                    </div>
                </div>
                <div className='w-full'>
                    <div
                        className='flex font-bold ml-10 relative w-full justify-start items-end pb-20 pl-20 pr-20 gap-20'>
                        <div onClick={handleClick}
                             className='flex gap-8 justify-center cursor-pointer hover:bg-transparent items-center'>{`Use Case (${useCases.length})`}<FuseSvgIcon
                            size={24} className='text-blue-500'>heroicons-outline:arrow-narrow-right</FuseSvgIcon>
                        </div>
                    </div>
                    <div className='flex w-full justify-start items-end pb-20 pl-20 pr-20 gap-20'>
                        {loading ? (
                            <FuseLoading></FuseLoading>
                        ) : (
                            useCases.map((useCase, index) => (
                                <div
                                    key={index}
                                    className={`card hover:scale-105 hover:filter transition duration-300 ease-in-out hover relative flex lg:flex-col md:flex-row sm:flex-row  ${
                                        index === 0 ? 'bg-white shadow-2xl' : 'bg-[#DAECFE]'
                                    } gap-10 lg:w-1/4 sm:w-2/4 md:w-2/4 rounded-2xl mb-32 m-6 overflow-hidden`}
                                >
                                    <div onClick={() => handleCardClick(useCase)}
                                         className="flex cursor-pointer flex-col gap-10">
                                        <div className="flex items-center text-blue-500 justify-between px-8 pt-12">
                                            <Typography
                                                className="px-16 text-lg font-medium tracking-tight leading-6 truncate">
                                                {useCase.title}
                                            </Typography>
                                        </div>
                                        <div
                                            className="text-md font-medium md:mr-24 md:ml-24 line-clamp-2"
                                            title={useCase.description}
                                        >
                                            {useCase.description}
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-10 flex-col">
                                        <div
                                            className="text-lg md:pr-24 md:pl-24 md:pb-24 font-medium flex flex-row justify-between pt-20 tracking-tight leading-6 truncate"
                                            color="text.secondary"
                                        >
                <span className="truncate flex flex-col">
                    <b className="px-8 text-blue-500">{String(`${useCase.OpenCount}`)}</b>
                    <span className="truncate"></span>
                    {'Open'}
                    <b className="px-8"></b>
                </span>
                                            {useCase.favorite ? (
                                                <span
                                                    className="truncate flex flex-col hover:scale-110 cursor-pointer"
                                                    onClick={() => handleChange(useCase)}
                                                    title="Remove from Favorites"
                                                >
                        <FuseSvgIcon size={32}>heroicons-solid:star</FuseSvgIcon>
                    </span>
                                            ) : (
                                                <span
                                                    className="truncate flex flex-col"
                                                    onClick={() => handleChange(useCase)}
                                                    title="Add to Favorites"
                                                >
                        <FuseSvgIcon size={32}>heroicons-outline:star</FuseSvgIcon>
                    </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))

                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default homeContent;