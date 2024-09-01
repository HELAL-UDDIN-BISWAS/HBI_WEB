import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Function to mask phone number
export function maskPhoneNumber(phoneNumber) {
	if (!phoneNumber || typeof phoneNumber !== 'string') {
		return ''; // Return an empty string if phoneNumber is invalid
	}

	const cleanedPhoneNumber = phoneNumber.startsWith('+')
		? phoneNumber.slice(1)
		: phoneNumber;

	if (cleanedPhoneNumber.length < 6) {
		return cleanedPhoneNumber; // Not enough characters to mask
	}

	const start = cleanedPhoneNumber.slice(0, 4);
	const end = cleanedPhoneNumber.slice(-2);
	const maskedPart = '*'.repeat(cleanedPhoneNumber.length - 6);

	return `${start}${maskedPart}${end}`;
}

// Function to mask email
export function maskEmail(email) {
	if (!email || typeof email !== 'string') {
		return ''; // Return an empty string if email is invalid
	}

	const [localPart, domain] = email.split('@');

	if (localPart.length < 3) {
		return email; // Not enough characters to mask
	}

	const start = localPart[0];
	const end = localPart.slice(-1);
	const maskedPart = '*'.repeat(localPart.length - 2);

	return `${start}${maskedPart}${end}@${domain}`;
}

// Function to determine whether the identifier is an email or phone number and mask accordingly
export function maskIdentifier(identifier) {
	if (!identifier || typeof identifier !== 'string') {
		return ''; // Return an empty string if identifier is invalid
	}

	// Regular expression to check if the identifier is an email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailRegex.test(identifier)) {
		return maskEmail(identifier);
	} else {
		return maskPhoneNumber(identifier);
	}
}

export function formatDate(inputDate) {
	// Create a new Date object from the input string
	const date = new Date(inputDate);

	// Define an array of month names
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// Extract the day, month, and year from the date object
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Format the date as "DD MMM YYYY"
	return `${day} ${month} ${year}`;
}
