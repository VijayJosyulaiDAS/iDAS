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
		title: 'home',
		translate: 'HOME',
		type: 'item',
		icon: 'heroicons-outline:home',
		url: 'home'
	},{
		id: 'example-component2',
		title: 'Example',
		translate: 'RECOMMENDATIONS',
		type: 'item',
		icon: 'heroicons-outline:star',
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
		title: 'Sources',
		translate: 'DATA_SOURCES',
		type: 'group',
		icon: 'heroicons-outline:star',
		subtitle: 'These data sources we are using',
		children: [
			{
				id: 'source.bom',
				title: 'BOM Data',
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/bom'
			},{
				id: 'source.m_1',
				title: 'M-1 Data',
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/m-1'
			},{
				id: 'source.production',
				title: 'Production Data',
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/production'
			},{
				id: 'source.mrp',
				title: 'MRP Data',
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/mrp'
			},{
				id: 'source.pos',
				title: "PO's Data",
				type: 'item',
				icon: 'heroicons-outline:table',
				url: '/apps/source/pos'
			},
		]
	},
];

export default navigationConfig;
