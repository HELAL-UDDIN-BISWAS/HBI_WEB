'use client';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { parseCookies, setCookie } from 'nookies';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
	FORGET_PASSWORD_MUTATION,
	RESET_PASSWORD,
	RESEND_FORGOT_PASSWORD,
	CHANGE_PASSWORD,
	FORGET_PASSWORD_SMS_MUTATION,
} from '../graphql/mutations/auth';
import { UPDATE_USER } from '../graphql/mutations/user';
import { GET_ME, GET_USER_PROFILE } from '../graphql/queries/me';
import apolloClient from '../lib/apolloClient';
import { notifyAndLogError } from '../utils/notification';

const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			registerInfo: null,
			token: null,

			loginUserData: null,
			isAuthenticated: false,

			step: 'signin',
			forgetPasswordMessage: '',
			isEmailSent: false,
			isLoading: false,
			isSmsSent: false,
			updatePwSuccess: false,
			currentPath: null,
			rememberMe: false,
			guest: false,
			otpMsg: null,
			resendMsg: null,
			userInfo: null,
			addressInfo: null,
			membershipInfo: null,
			selectedFile: null,
			fcmToken: null,
			setSelectedFile: (data) => {
				set({ selectedFile: data });
			},
			setResendMsg: (data) => {
				set({ resendMsg: data });
			},
			setUserInfo: (data) => {
				console.log('data', data);
				set({ userInfo: data });
			},
			setAddressInfo: (data) => {
				set({ addressInfo: data });
			},
			setMembershipInfo: (data) => {
				set({ membershipInfo: data });
			},
			resetSignupData: () => {
				set({
					userInfo: null,
					membershipInfo: null,
					selectedFile: null,
					addressInfo: null,
				});
			},
			logout: () => {
				deleteCookie('email');
				deleteCookie('token');
				deleteCookie('rememberMe');
				deleteCookie('user');
				deleteCookie('currentRole');
				deleteCookie('authCode');
				deleteCookie('guest');
				deleteCookie('fcmToken');
				set({
					user: null,
					token: null,
					rememberMe: false,
					registerInfo: null,
					currentPath: null,
					guest: false,
					fcmToken: null,
				});
			},

			setCurrentPath: (path) => {
				console.log('here store', path);
				set({ currentPath: path });
			},
			setStep: (stats) => {
				set({ step: stats });
			},
			setGuest: (flagCondition) => {
				set({ guest: flagCondition });
			},
			setFcmToken: (token) => {
				set({ fcmToken: token });
				setCookie(null, 'fcmToken', token, {
					maxAge: 30 * 24 * 60 * 60, // 30 days
					path: '/',
				});
			},
			login: async (loginData) => {
				set({ isLoading: true });
				try {
					const requestBody = {
						identifier: loginData?.email,
						password: loginData?.password,
						// Add more key-value pairs as needed
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
						requestBody
					);
					console.log('login response', response);
					if (response?.status === 200) {
						set({
							user: response?.data?.user,
							token: response?.data?.jwt,
						});
						setCookie(null, 'user', JSON.stringify(response.data?.user), {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});

						setCookie(null, 'token', response.data?.jwt, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'rememberMe', loginData?.rememberMe, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'currentRole', response?.data?.user?.role?.name, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'guest', false, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						set({ rememberMe: loginData?.rememberMe, isLoading: false });
						return response;
					} else {
						set({
							registerInfo: loginData,
							rememberMe: loginData?.rememberMe,
							isLoading: false,
						});
						setCookie(null, 'email', loginData?.email, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'rememberMe', loginData?.rememberMe, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'guest', false, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'fcmToken', response.data?.fcmToken, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						return response?.data?.error?.message;
					}
				} catch (err) {
					set({
						isLoading: false,
						registerInfo: {
							...loginData,
							id: err?.response?.data?.error?.details?.userId,
						},
						registerUserId: err?.response?.data?.error?.details?.userId,
						rememberMe: loginData?.rememberMe,
					});
					setCookie(null, 'rememberMe', loginData?.rememberMe, {
						maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
						path: '/', // Cookie path
					});
					setCookie(null, 'email', loginData?.email, {
						maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
						path: '/', // Cookie path
					});
					setCookie(null, 'guest', false, {
						maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
						path: '/', // Cookie path
					});
					const notification = err?.response?.data?.error?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
					return err?.response?.data?.error?.message;
				}
			},

			registerUser: async (data) => {
				set({ isLoading: true });
				try {
					const requestBody = {
						email: data?.email,
						password: data?.password,
						referById: data?.referById,
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
						requestBody
					);
					console.log('register user', response);
					if (response) {
						set({
							registerInfo: response?.data?.user,
						});
						setCookie(null, 'email', response?.data?.user?.email, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});

						// first install nookies lib and do the cookie if needed

						setCookie(null, 'user', JSON.stringify(response.data?.user), {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'currentRole', response?.data?.user?.role?.name, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						return response;
					}

					//  showDefaultNoti("Registered Successfully", "success");
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					return err?.response?.data?.error?.message;
				}
			},

			verifyOTP: async (data) => {
				console.log('data verify OTP', data);
				try {
					const requestBody = {
						otpCode: data?.code,
						identifier: parseCookies()?.email,
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
						requestBody
					);

					if (response) {
						// set({
						// 	user: response?.data?.data?.user,
						// 	token: response?.data?.data?.jwt,
						// });

						setCookie(null, 'email', response?.data?.data?.user?.email, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});

						// first install nookies lib and do the cookie if needed

						setCookie(null, 'user', JSON.stringify(response.data?.data?.user), {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'currentRole', response?.data?.user?.role?.name, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'token', response?.data?.data?.jwt, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						return response;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					return err?.response?.data?.error?.message;
				}
			},
			verifyAuthOTP: async (data) => {
				console.log('data verifyAuthOTP OTP', data);
				set({isLoading: true, resendMsg: null });
				try {
					const requestBody = {
						otpCode: data?.code,
						identifier: parseCookies()?.email,
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
						requestBody
					);
					if (response) {
						// set({
						// 	user: response?.data?.data?.user,
						// 	token: response?.data?.data?.jwt,
						// });

						setCookie(null, 'email', response?.data?.data?.user?.email, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});

						// first install nookies lib and do the cookie if needed

						setCookie(
							null,
							'user',
							JSON.stringify(response?.data?.data?.user),
							{
								maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
								path: '/', // Cookie path
							}
						);
						setCookie(null, 'authCode', response?.data?.data?.code, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'currentRole', response?.data?.user?.role?.name, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						setCookie(null, 'token', response?.data?.data?.jwt, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						set({
							isLoading: false,
						});
						return response;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					set({ otpMsg: err?.response?.data?.error?.message });
					return err?.response?.data?.error?.message;
				}
			},
			resendOTP: async () => {
				try {
					const requestBody = {
						identifier: parseCookies()?.email,
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`,
						requestBody
					);
					if (response?.data?.data?.sent) {
						set({ resendMsg: response?.data?.data?.message });
						return response;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					set({ resendMsg: err?.response?.data?.error?.message });
					return err?.response?.data?.error?.message;
				}
			},
			resendForgotPasswordOTP: async (identifier) => {
				try {
					const requestBody = {
						identifier,
					};
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-forgotpassword-otp`,
						requestBody
					);
					if (response?.data?.data?.sent) {
						set({ resendMsg: response?.data?.data?.message });
						return response;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					set({ resendMsg: err?.response?.data?.error?.message });
					return err?.response?.data?.error?.message;
				}
			},
			updateToken: async (fcmToken, userId) => {
				set({ isLoading: true });
				try {
					const { data } = await apolloClient.mutate({
						mutation: UPDATE_USER,
						fetchPolicy: 'network-only',
						variables: {
							id: userId,
							data: {
								fcmToken: fcmToken,
							},
						},
					});
					if (data?.updateUsersPermissionsUser?.data?.id) {
						set({ isLoading: false });
						return true;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
				}
			},
			getMe: async () => {
				const token = parseCookies()?.token;
				try {
					let response = await apolloClient.query({
						query: GET_ME,
						fetchPolicy: 'network-only',
						headers: {
							authorization: `Bearer ${token}`,
						},
						fetchPolicy: 'network-only',
					});
					if (response) {
						set({
							user: response?.data?.me,
						});
						setCookie(null, 'currentRole', response?.data?.me?.role?.name, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
					}
				} catch (err) {
					const notification = err?.message;
					console.log('err', err);
				}
			},
			requestPassword: async (data) => {
				set({ isLoading: true });
				try {
					let response = await apolloClient.mutate({
						mutation: FORGET_PASSWORD_MUTATION,
						variables: {
							email: data?.email,
						},
						fetchPolicy: 'network-only',
					});
					if (response?.data?.forgotPassword?.data?.sent) {
						set({
							isLoading: false,
							isEmailSent: true,
							forgetPasswordMessage:
								response?.data?.forgotPassword?.data?.message,
						});
						setCookie(null, 'email', data?.email, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						return {
							ok: response?.data?.forgotPassword?.data?.sent,
							msg: response?.data?.forgotPassword?.data?.message,
						};
					} else {
						const noti = response?.data?.forgotPassword?.error?.message;
						const error = response?.data?.forgotPassword?.error?.message;
						notifyAndLogError({ error, noti });
						set({ isLoading: false });
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
				}
			},
			requestPhonePassword: async (data) => {
				set({ isLoading: true });
				try {
					let response = await apolloClient.mutate({
						mutation: FORGET_PASSWORD_SMS_MUTATION,
						variables: {
							phone: data?.phone,
						},
						fetchPolicy: 'network-only',
					});
					console.log('response from auth', response);
					if (response?.data?.forgotPassword?.data?.sent) {
						set({
							isLoading: false,
							isSmsSent: true,
							forgetPasswordMessage:
								response?.data?.forgotPassword?.data?.message,
						});
						setCookie(null, 'phone', data?.phone, {
							maxAge: 30 * 24 * 60 * 60, // Max age in seconds (e.g., 30 days)
							path: '/', // Cookie path
						});
						return {
							ok: response?.data?.forgotPassword?.data?.sent,
							msg: response?.data?.forgotPassword?.data?.message,
						};
					} else {
						const noti = response?.data?.forgotPassword?.error?.message;
						const error = response?.data?.forgotPassword?.error?.message;
						notifyAndLogError({ error, noti });
						set({ isLoading: false });
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
				}
			},
			updateUserPassword: async (data) => {
				const code = parseCookies()?.authCode;
				set({ isLoading: true });
				try {
					let response = await apolloClient.mutate({
						mutation: RESET_PASSWORD,
						variables: {
							code: code,
							password: data?.password,
							passwordConfirmation: data?.newPassword,
						},
						fetchPolicy: 'network-only',
					});
					console.log('response from 366', response);
					if (response?.data?.resetPassword?.user?.confirmed) {
						set({ updatePwSuccess: true, isLoading: false });
						return true;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
				}
			},
			changePassword: async (data, token) => {
				// const code = parseCookies().authCode;
				set({ isLoading: true });
				try {
					let response = await apolloClient.mutate({
						mutation: CHANGE_PASSWORD,
						variables: {
							currentPassword: data.currentPassword,
							password: data.password,
							passwordConfirmation: data.passwordConfirmation,
						},
						fetchPolicy: 'network-only',
						headers: {
							authorization: `Bearer ${token}`,
						},
					});
					console.log('response from 294', response?.data);
					if (response?.data?.changePassword?.user?.confirmed) {
						set({ updatePwSuccess: true, isLoading: true });
						return true;
					}
				} catch (err) {
					set({ isLoading: false });
					const notification = err?.message;
					console.log('err', err);
					notifyAndLogError({ err, notification });
				}
			},
		}),
		{
			name: 'authSession',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				registerUserId: state.registerUserId,

				registerInfo: state.registerInfo,

				user: state.user,
				token: state.token,
				currentPath: state.currentPath,
				rememberMe: state.rememberMe,
				userInfo: state.userInfo,
				addressInfo: state.addressInfo,
				membershipInfo: state.membershipInfo,
				selectedFile: state.selectedFile,
				guest: state.guest,
				fcmToken: state.fcmToken, // Include fcmToken in partialize
			}),
		}
	)
);

export default useAuthStore;
