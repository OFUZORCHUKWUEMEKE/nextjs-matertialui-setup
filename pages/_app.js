import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from 'apollo-link-context';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import BlogProvider from '../components/BlogContext';

const clientSideEmotionCache = createEmotionCache();

const authLink = setContext((_, { headers }) => {
  // const [token,setToken] = useState('')
  // get the authentication token from local storage if it exists
  // const token = JSON.parse(localStorage.getItem('token'));
  // console.log(token)
  if (typeof window !== 'undefined'){
    // Perform localStorage action
    const token = JSON.parse(localStorage.getItem('token'));
    // setToken(token)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }
  // return the headers to the context so httpLink can read them
  
});

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});


const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <BlogProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </BlogProvider>
      </CacheProvider>
    </ApolloProvider>

  );
};

export default MyApp;

export async function getServerSideProps() {
  // Fetch data from external API
 
  const data = localStorage.getItem('token')

  // Pass data to the page via props
  return { props: { data } }
}


// export const getServerSideProps = ()=>{
 
// }

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
