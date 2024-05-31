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
	},
];

export default navigationConfig;
