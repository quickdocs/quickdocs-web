import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'

const theme = extendTheme({
  colors: {
    brand: '#1d304e',
    primary: {
      50: '#e7f2ff',
      100: '#c5d5ed',
      200: '#a2b9dc',
      300: '#7e9dce',
      400: '#5b80bf',
      500: '#4167a5',
      600: '#315081',
      700: '#23395d',
      800: '#13223a',
      900: '#030b19',
    },
    secondary: {
      300: '#f67152',
    },
  },
  styles: {
    global: {
      "html, body": {
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      },
      ".container": {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      ".container main": {
        flex: 1,
      },
      ".main": {
        marginLeft: '20px',
        marginRight: '20px',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
