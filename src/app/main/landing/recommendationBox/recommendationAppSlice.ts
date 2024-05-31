import { WithSlice, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState: {
	selectedMailIds: string[];
	searchText: string;
} = { selectedMailIds: [], searchText: '' };

/**
 * The Mailbox App slice.
 */
export const recommendationAppSlice = createSlice({
	name: 'recommendationboxApp',
	initialState,
	reducers: {
		setSelectedMailIds: (state, action) => {
			state.selectedMailIds = action.payload as string[];
		},
		selectAllMails: (state, action) => {
			const mailList = action.payload ;
			state.selectedMailIds = mailList.map((mail) => mail.id);
		},
		deselectAllMails: (state) => {
			state.selectedMailIds = initialState.selectedMailIds;
		},
		toggleInSelectedMails: (state, action) => {
			const mailId = action.payload as string;
			state.selectedMailIds = _.xor(state.selectedMailIds, [mailId]);
		},
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	},
	selectors: {
		selectRecommendationMailIds: (state) => state.selectedMailIds,
		selectSearchText: (state) => state.searchText
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(recommendationAppSlice);
const injectedSlice = recommendationAppSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof recommendationAppSlice> {}
}

export const { selectRecommendationMailIds, selectSearchText } = injectedSlice.selectors;

export const { setSelectedMailIds, toggleInSelectedMails, deselectAllMails, selectAllMails, setSearchText } =
	recommendationAppSlice.actions;

const selectedMailIdsReducer = recommendationAppSlice.reducer;

export type selectedMailIdsSliceType = typeof recommendationAppSlice;

export default selectedMailIdsReducer;
