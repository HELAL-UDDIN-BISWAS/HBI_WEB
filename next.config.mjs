/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"localhost",
			"hbi-office.singaporetestlab.com",
			"192.168.1.5",
			"127.0.0.1",
			"media.istockphoto.com",
		],
	},
};

export default nextConfig;
