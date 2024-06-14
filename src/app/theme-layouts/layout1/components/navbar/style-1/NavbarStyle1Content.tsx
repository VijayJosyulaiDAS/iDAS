import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import {memo, useEffect, useState} from 'react';
import Navigation from 'app/theme-layouts/shared-components/navigation/Navigation';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import Logo from '../../../../shared-components/Logo';
import UserNavbarHeader from '../../../../shared-components/UserNavbarHeader';

const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	'& ::-webkit-scrollbar-thumb': {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
		}`
	},
	'& ::-webkit-scrollbar-thumb:active': {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
		}`
	}
}));

const StyledContent = styled(FuseScrollbars)(() => ({
	overscrollBehavior: 'contain',
	overflowX: 'hidden',
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 40px, 100% 10px',
	backgroundAttachment: 'local, scroll'
}));

type NavbarStyle1ContentProps = {
	className?: string;
};

/**
 * The navbar style 1 content.
 */
function NavbarStyle1Content(props: NavbarStyle1ContentProps) {
	const { className = '' } = props;
	const [refreshTime, setRefreshTime] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const formattedTime = formatDateTime(now);
			setRefreshTime(formattedTime);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatDateTime = (date) => {
		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		const yyyy = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${dd}-${mm}-${yyyy} | ${hours}:${minutes}:${seconds}`;
	};

	return (
		<Root className={clsx('flex h-full flex-auto flex-col overflow-hidden', className)}>
			<div className="flex h-48 shrink-0 flex-row items-center px-20 md:h-72">
				<div className="mx-4 flex flex-1">
					{/*<Logo />*/}
				</div>

				<NavbarToggleButton className="h-40 w-40 p-0" />
			</div>

			<StyledContent
				className="flex min-h-0 flex-1 flex-col"
				option={{ suppressScrollX: true, wheelPropagation: false }}
			>
				<UserNavbarHeader />

				<Navigation layout="vertical" />

				<div className="flex-0 flex items-center flex-col gap-10 justify-center py-48 opacity-60">
					<img
						className="w-full max-w-64"
						src="assets/images/png/PG-logo.png"
						alt="footer logo"
					/>
					<div
						className="w-full flex items-center justify-center">
						<span>Last Refresh: {refreshTime}</span>
					</div>
				</div>
			</StyledContent>
		</Root>
	);
}

export default memo(NavbarStyle1Content);
