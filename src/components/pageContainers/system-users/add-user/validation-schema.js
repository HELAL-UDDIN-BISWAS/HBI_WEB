import * as yup from 'yup';

export const userSchema = yup.object().shape({
	email: yup.string().email().required(),
	fullName: yup.string().required(),
	gender: yup.string().required(),
	mobileNumber: yup.string().required(),
    dateOfBirth: yup.date().required(),
	nationality: yup.string().required(),
	passport: yup.string().required(),
	role: yup.string().required(),
});
