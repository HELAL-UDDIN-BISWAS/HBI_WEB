import apolloClient from '@/lib/apolloClient';
import { create } from 'zustand';
import { sanitizeObject } from '@/utils/sanitizer';
import { GET_ALL_PROMOTIONS,  GET_SINGLE_PROMOTION} from '@/graphql/queries/promotion';
import { CREATE_PROMOTION, DELETE_PROMOTION, UPDATE_PROMOTION } from '@/graphql/mutations/promotion';

export const usePromotionStore = create((set) => ({
	promotions: [],
	promotion: null,
	isLoading: false,
	paginationData: null, 

	getAllPromotion: async ( {searchText, filter, percent, page = 1, pageSize = 100}) => {
		set({ isLoading: true });
		try {
			const filters = {};

		// Add search filter if searchText is not empty
		if (searchText) {
			filters.productName = { containsi: searchText };
		
		}

		// Add tier filter if filter is not empty
		if (filter) {
			filters.tier = { eq: filter };
		}
		if (percent) {
			filters.percentOff = { eq: percent };
			filters.percentOff = { eq: percent };
		}
			const { data } = await apolloClient.query({
				query: GET_ALL_PROMOTIONS,
				fetchPolicy: "network-only",
				variables: {
					filters,
					page,
					pageSize
				  },
			});
			
			
			const promotionData = data?.promotions?.data?.map(sanitizeObject)
			const paginationData = data?.promotions?.meta?.pagination;

			set({isLoading: false, promotions:promotionData, paginationData})
		} catch (err) {
			console.log(err);
			set({ isLoading: false, error: err });
		}
	},
	createPromotion: async (inputData) => {
		set({ isLoading: true });
		try {
		  const { data } = await apolloClient.mutate({
			mutation: CREATE_PROMOTION,
			fetchPolicy: "network-only",
			variables: {
			  data: inputData,
			},
		  });
 
		  if (data?.createPromotion?.data?.id) {
			set({ isLoading: false });
			return data?.createPromotion?.data;
		  }
		  
		} catch (err) {
		  set({ isLoading: false });
		  console.log("err", err);
		}
	  },
	//   Get single Promotion
	getSinglePromotion: async (id) => {
		set({ isLoading: true });
		try {
		  const { data } = await apolloClient.query({
			query: GET_SINGLE_PROMOTION,
			fetchPolicy: "network-only",
			variables: { id },
		  });
		  if (data?.promotion?.data) {
			set({ isLoading: false, promotion: data.promotion.data });
		  }
		} catch (err) {
		  set({ isLoading: false });
		  console.error("Error fetching promotion:", err);
		}
	  },
	  
	//   Update Promotion

	updatePromotion: async ({ id, productName, percentOff, tier }) => {
		set({ isLoading: true });
		try {
		  const { data } = await apolloClient.mutate({
			mutation: UPDATE_PROMOTION,
			variables: {
			  updatePromotionId: id,
			  data: {
				productName,
				percentOff,
				tier,
			  },
			},
		  });
	
		  if (data?.updatePromotion?.data?.id) {
			set({ isLoading: false });
			return data.updatePromotion.data;
		  }
		} catch (error) {
		  set({ isLoading: false });
		  console.error('Error updating promotion:', error);
		  throw error;
		}
	  },

	  deletePromotion: async ({ id }) => {
		set({ isLoading: true });
		try {
		  const { data } = await apolloClient.mutate({
			mutation: DELETE_PROMOTION,
			fetchPolicy: "network-only",
			variables: {
				deletePromotionId: id,
			},
		  });
	
		  if (data?.deletePromotion?.data?.id) {
			set({ isLoading: false });
	
			return true;
		  }
		} catch (error) {
		  console.error("Error deleting promotion:", error);
		  set({ isLoading: false });
		}
	  },
}));


export default usePromotionStore;