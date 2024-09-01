import * as yup from 'yup';

export const userSchema = yup.object().shape({
	email: yup.string().email().required(),
	fullName: yup.string().min(1).required(),
	name: yup.string().min(1).required(),
	gender: yup.string().required(),
	phoneNo: yup.string().required(),
	dateofbirth: yup.string().min(1).required(),
	nationality: yup.string().required(),
	passport: yup.string().min(1).required(),
});