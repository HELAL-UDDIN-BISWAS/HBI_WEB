import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ToastStyles.module.css';

const CustomToast = ({ label, message }) => (
	<div className={styles.customToast}>
		<div className={styles.content}>
			<strong>{label}</strong>
			<p>{message}</p>
		</div>
	</div>
);

export const notify = (label, message) => {
	toast.success(
		<CustomToast
			label={label}
			message={message}
		/>,
		{
			position: 'top-right',
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			closeButton: true,
			style: {
				borderLeft: '3px solid #5FA452',
				borderTopLeftRadius: '5px',

				color: '#28a745',
			},
		}
	);
};
