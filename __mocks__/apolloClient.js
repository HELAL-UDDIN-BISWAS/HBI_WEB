import { MockedProvider } from '@apollo/client/testing';

export const mockApolloClient = ({ children, mocks = [] }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};
