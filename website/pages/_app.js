import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'

const theme = extendTheme({
  colors: {
    primary: {
      100: '#9db0ce',
      500: '#5d708e',
      900: '#1d304e',
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
