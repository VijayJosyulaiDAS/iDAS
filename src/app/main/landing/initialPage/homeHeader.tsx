import Typography from '@mui/material/Typography';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { useAppSelector } from 'app/store/hooks';


function HomeHeader() {
    const user = useAppSelector(selectUser);

    return (
        <div className="flex flex-col w-full px-24 sm:px-32 bg-white p-20">
            <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
                <div className="flex flex-auto items-center min-w-0">
                    <div className="flex flex-col min-w-0 mx-16">
                        <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                            {`Good Morning,${user.data.displayName}!`}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
