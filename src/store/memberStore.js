import { create } from 'zustand';
import { gql } from '@apollo/client';
import {
	GET_ALL_MEMBERS,
	GET_ALL_ROLES,
	GET_MEMBER_BY_ID,
} from '@/graphql/queries/member';
import apolloClient from '@/lib/apolloClient';
import {
	CREATE_MEMBER,
	CREATE_PROFILE,
	UPDATE_MEMBER,
	UPDATE_MEMBER_STATUS,
	UPDATE_PROFILE,
} from '@/graphql/mutations/member';
import { toast } from 'react-toastify';

const useMemberStore = create((set, get) => ({
	members: [],
	memberRoleId: null,
	loading: false,
	selectedMember: null,
	error: null,
	filters: {
		email: '',
		status: '',
		passport: '',
	},
	pagination: {
		page: 1,
		pageSize: 10,
		total: 0,
	},
	fetchMembers: async (resetPage = false) => {
		set({ loading: true, error: null });
		let { pagination } = get();
		const filters = getFilters();
		if (resetPage) {
			pagination = { ...pagination, page: 1 };
			set({ pagination });
		}
		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_MEMBERS,
				fetchPolicy: 'network-only',
				variables: {
					filters: {
						...filters,
						role: {
							name: {
								eq: 'Members',
							},
						},
					},
					page: pagination.page,
					pageSize: pagination.pageSize,
				},
			});
			set({
				members: data.usersPermissionsUsers.data,
				loading: false,
				pagination: {
					...pagination,
					total: data.usersPermissionsUsers.meta.pagination.total,
				},
			});
		} catch (error) {
			set({ error, loading: false });
		}
	},

	setPage: (page) => {
		set((state) => ({ pagination: { ...state.pagination, page } }));
		get().fetchMembers();
	},

	setPageSize: (pageSize) => {
		set((state) => ({ pagination: { ...state.pagination, pageSize } }));
		get().fetchMembers(); // Fetch members whenever the page size changes
	},
	updateMemberStatus: async (id, status) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.mutate({
				mutation: UPDATE_MEMBER_STATUS,
				variables: { id, status },
			});
			set((state) => ({
				members: state.members.map((member) =>
					member.id === id
						? {
								...member,
								attributes: {
									...member.attributes,
									status:
										data.updateUsersPermissionsUser.data.attributes.status,
								},
							}
						: member
				),
				loading: false,
			}));
		} catch (error) {
			set({ error, loading: false });
		}
	},

	setFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		}));
	},

	resetFilters: () => {
		set({
			filters: {
				email: '',
				status: '',
				passport: '',
			},
		});
	},

	fetchMemberById: async (id) => {
		set({ loading: true, error: null });

		try {
			const { data } = await apolloClient.query({
				query: GET_MEMBER_BY_ID,
				variables: { id },
				fetchPolicy: 'network-only',
			});
			set({ selectedMember: data.usersPermissionsUser.data, loading: false });
		} catch (error) {
			set({ error, loading: false });
		}
	},
	createMember: async (profileInput, userInput) => {
		set({ loading: true, error: null });
		try {
			// Create profile
			const { data: profileData } = await apolloClient.mutate({
				mutation: CREATE_PROFILE,

				variables: { profile: profileInput },
			});
			const profileId = profileData.createProfile.data.id;

			// Create member
			const { data } = await apolloClient.mutate({
				mutation: CREATE_MEMBER,
				fetchPolicy: 'network-only',
				variables: { ...userInput, profileId },
			});

			const newMember = data.createUsersPermissionsUser.data;

			const { members, pagination } = get();

			const updatedMembers = [newMember, ...members];

			set({
				members: updatedMembers,
				loading: false,
				pagination: {
					...pagination,
					total: pagination.total + 1,
				},
			});
			return newMember
		} catch (error) {
			set({ error, loading: false });
		}
	},

	updateMember: async (id, profileId, profileInput, userInput) => {
		set({ loading: true, error: null });

		try {
			await apolloClient.mutate({
				mutation: UPDATE_PROFILE,

				variables: { id: profileId, input: profileInput },
			});

			const { data } = await apolloClient.mutate({
				mutation: UPDATE_MEMBER,
				variables: { id, ...userInput, profile: profileId },
			});
			set((state) => ({
				members: state.members.map((member) =>
					member.id === id ? data.updateUsersPermissionsUser.data : member
				),
				loading: false,
			}));
			return data.updateUsersPermissionsUser.data
		} catch (error) {
			set({ error, loading: false });

			toast.error(`Error: ${error.message}`);
		}
	},

	getAllMembers: async () => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_MEMBERS,
				variables: {
					filters: {
						role: {
							name: {
								eq: 'Members',
							},
						},
					},
					page: 1,
					pageSize: 10000, // Fetch all records or a reasonable max limit
				},
			});
			set({ loading: false });
			return data.usersPermissionsUsers.data;
		} catch (error) {
			set({ error, loading: false });
			return [];
		}
	},

	getFilteredMembers: async () => {
		set({ loading: true, error: null });
		const filters = getFilters();
		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_MEMBERS,
				variables: {
					filters: {
						...filters,
						role: {
							name: {
								eq: 'Members',
							},
						},
					},
					page: 1,
					pageSize: 10000, // Fetch all records or a reasonable max limit
				},
			});
			set({ loading: false });
			return data.usersPermissionsUsers.data;
		} catch (error) {
			set({ error, loading: false });
			return [];
		}
	},

	fetchMemberRole: async () => {
		set({ loading: true, error: null });

		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_ROLES,
				variables: {
					filters: {
						name: { containsi: 'Members' },
					},
				},
			});
			if (data?.usersPermissionsRoles?.data?.length > 0) {
				const roleId = data?.usersPermissionsRoles?.data[0]?.id;
				set({ memberRoleId: roleId, loading: false });
				console.log('Member Role ID:', roleId);
			} else {
				throw new Error('No matching role found');
			}
		} catch (error) {
			set({ error, loading: false });
			console.error('Error fetching member role ID:', error);
		}
	},
}));

export default useMemberStore;

// Helper function to construct filters object
const getFilters = () => {
	const { email, status, passport } = useMemberStore.getState().filters;
	let filters = {};
	if (email) filters.email = { containsi: email };
	if (status && status !== 'all') filters.status = { eq: status };
	if (passport) filters.profile = { passport: { containsi: passport } };
	return filters;
};
