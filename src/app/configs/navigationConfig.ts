import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'example-component',
		title: 'Home',
		translate: 'HOME',
		type: 'item',
		icon: 'heroicons-outline:home',
		url: 'home'
	},{
		id: 'example-component2',
		title: 'Recommendations',
		translate: 'RECOMMENDATIONS',
		type: 'item',
		icon: 'heroicons-outline:light-bulb',
		url: '/apps/landing'
	},{
		id: 'example-component',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: 'heroicons-outline:star',
		url: 'example'
	},{
		id: 'source',
		title: 'Data Sources',
		translate: 'DATA_SOURCES',
		type: 'group',
		icon: 'heroicons-outline:document-text',
		subtitle: 'These data sources we are using',
		children: [
			{
				id: 'source.masterData',
				title: 'Master Data',
				translate: 'MASTER_DATA',
				type: 'collapse',
				icon: 'heroicons-outline:document-text',
				children: [

					{
						id: 'source.masterData.bom',
						title: 'BOM Data',
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/bom'
					},
					{
						id: 'source.m_1',
						title: 'M-1 Data',
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/m-1'
					},
					{
						id: 'source.production',
						title: 'Production Data',
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/production'
					},
					{
						id: 'source.mrp',
						title: 'MRP Data',
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/mrp'
					},
					{
						id: 'source.pos',
						title: "PO's Data",
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/pos'
					},
					{
						id: 'source.upcoming_production',
						title: "Upcoming Production",
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/upcoming_production'
					},
					{
						id: 'source.stock _summary',
						title: "Stock Summary",
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/stock_summary'
					},
					{
						id: 'source.yesterday_production',
						title: "Yesterday Production",
						type: 'item',
						icon: 'heroicons-outline:table',
						url: '/apps/source/yesterday_production'
					},
				]
			}
		]
	},{
		id: 'user_management',
		title: 'User Management',
		translate: 'DATA_SOURCES',
		type: 'group',
		icon: 'heroicons-outline:document-text',
		subtitle: 'Manage user roles and permission.',
		children: [
			{
				id: 'user_management.user',
				title: 'User Data',
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/user'
			}
		]
	},
];

export default navigationConfig;
