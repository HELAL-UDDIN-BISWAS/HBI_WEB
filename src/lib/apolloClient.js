// 'use client';
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

// const httpLink = createHttpLink({
// 	uri: GRAPHQL_URL,
// });

// const apolloClient = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// });

// export default apolloClient;

"use client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}/graphql`;
const httpLink = createHttpLink({
	uri: GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
	let authLocal = JSON.parse(localStorage.getItem("authSession"));
	let token =
		authLocal && authLocal.state && authLocal.state.accessToken
			? authLocal.state.accessToken
			: "";
	console.log(token, "authSession")
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}`,
		},
	};
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
export default apolloClient;