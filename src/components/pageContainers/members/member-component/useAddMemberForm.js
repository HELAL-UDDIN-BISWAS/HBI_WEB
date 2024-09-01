// hooks/useAddMemberForm.js
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useMemberStore from '@/store/memberStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const initialState = {
	gender: null,
	nationality: null,
	country: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_INPUT':
			return {
				...state,
				[action.fieldName]: action.payload,
			};
		default:
			return state;
	}
};

const schema = yup.object().shape({
	email: yup.string().email().required('Email is a required field'),
	fullName: yup.string().min(1).required('FullName is required field'),
	membershipId: yup.string().optional(),
	dateOfBirth: yup.string().min(1).required('Date of Birth is required field'),
	gender: yup.object().optional(),
	nationality: yup
		.object()
		.nullable()
		.required('Nationality is required field'),
	nricPassport: yup
		.string()
		.min(1)
		.required(`NRIC / Passport is required field`),
	mobileNumber: yup.string().required('Mobile Number is required field'),
	address1: yup.string().optional(),
	address2: yup.string().optional(),
	city: yup.string().optional(),
	postalCode: yup.string().optional(),
	country: yup.object().optional(),
	drugAllergies: yup.string().optional(),
	foodAllergies: yup.string().optional(),
});

export const useAddMemberForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { createMember, loading, error, fetchMemberRole, memberRoleId } =
		useMemberStore((state) => ({
			createMember: state.createMember,
			loading: state.loading,
			error: state.error,
			fetchMemberRole: state.fetchMemberRole,
			memberRoleId: state.memberRoleId,
		}));
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const profileInput = {
			dateOfBirth: data.dateOfBirth,
			membershipID: data?.membershipId,
			passport: data.nricPassport,
			name: data.fullName,
			gender: data?.gender?.value,
			country: data?.country?.value,
			phoneNo: data.mobileNumber,
			registeredDate: new Date().toISOString(),
			city: data?.city,
			postalCode: data?.postalCode,
			drugAllergy: data?.drugAllergies,
			foodAllergy: data?.foodAllergies,
			residentialAddressLine1: data?.address1,
			residentialAddressLine2: data?.address2,
			nationality: data.nationality?.value,
		};
		const userInput = {
			username: data.fullName,
			email: data.email,
			password: 'defaultpassword',
			role: '4',
		};
		try {
			await createMember(profileInput, userInput);
			toast.success('Member created successfully');
			reset();
			router.push('/members');
		} catch (err) {
			toast.error(`Error: ${error.message}`, { autoClose: 5000 });
		}
	};

	return {
		register,
		handleSubmit,
		control,
		reset,
		errors,
		onSubmit,
		state,
		dispatch,
		loading,
	};
};
