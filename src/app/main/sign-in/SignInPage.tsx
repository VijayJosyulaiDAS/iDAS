import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardContent from '@mui/material/CardContent';
import _ from '@lodash';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import JwtLoginTab from './tabs/JwtSignInTab';
import FirebaseSignInTab from './tabs/FirebaseSignInTab';
import PingFedSignInTab from './tabs/PingFedSignInTab';
import axios from "axios";
import * as url from "node:url";

const tabs = [
	{
		id: 'ping',
		title: 'PingFed',
		logo: 'assets/images/png/PingIdentity-Logo-KO-1024x380.png',
		logoClass: 'h-40 p-2 bg-transparent rounded-12'
	}
];

/**
 * The sign in page.
 */
 function SignInPage() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

	function handleSelectTab(id: string) {
		setSelectedTabId(id);
	}

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper style={{backgroundColor: '#252f3e'}} className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
				<CardContent className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<img
						className="w-[100px]"
						src="assets/images/png/PG-logo.png"
						alt="logo"
					/>
					<Typography className="mt-32 text-4xl text-white  font-extrabold leading-tight tracking-tight">
						Sign in
					</Typography>

					<Alert
						icon={false}
						severity="info"
						className="mt-24 px-16 text-13 leading-relaxed"
					>
						You are browsing the <b>Intelligent Decision Automation System (iDAS)</b>. Click on the "Employee Login" button to access the Dashboard.
					</Alert>

					<Tabs style={{display: 'none'}}
						value={_.findIndex(tabs, { id: selectedTabId })}
						variant="fullWidth"
						className="w-full mt-24 mb-32"
						indicatorColor="secondary"
					>
						{tabs.map((item) => (
							<Tab
								onClick={() => handleSelectTab(item.id)}
								key={item.id}
								icon={
									<img
										className={item.logoClass}
										src={item.logo}
										alt={item.title}
									/>
								}
								className="min-w-0"
								label={item.title}
							/>
						))}
					</Tabs>

					{selectedTabId === 'jwt' && <JwtLoginTab />}
					{selectedTabId === 'firebase' && <FirebaseSignInTab />}
					{selectedTabId === 'ping' &&  <PingFedSignInTab />}

				</CardContent>
			</Paper>

			<Box
				className="relative hidden h-full bg-white flex-auto items-center justify-center md:flex"
			>
				<div className='flex h-3/4 w-full text-white' style={{
					backgroundImage: `url('assets/images/iDAS_Logo-removebg.png')`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'contain'
				}}
				>
				</div>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{color: 'primary.light'}}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>
			</Box>
		</div>
	);
}

export default SignInPage;
