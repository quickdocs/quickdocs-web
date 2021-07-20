import Link from 'next/link'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Logo from '../atoms/Logo'
import SearchBar from './SearchBar'

const ServiceLogo = () => (
  <Box color="white" fontSize={["150%", "150%", "180%"]}>
    <Logo display="inline" /> &beta;
  </Box>
)

const GlobalHeader = ({ searchBar }) => (
  <Flex bg="brand" align="center">
    <Box px={6} py={[2, 2, 3]}>
      <Link href="/" passHref><a><ServiceLogo /></a></Link>
    </Box>
    <Spacer />
    {searchBar && <SearchBar mr={5} {...searchBar} />}
  </Flex>
)

export default GlobalHeader
