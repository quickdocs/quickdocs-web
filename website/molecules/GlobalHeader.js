import Link from 'next/link'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Logo from '../atoms/Logo'
import SearchBar from './SearchBar'

const ServiceLogo = () => (
  <Logo fontSize={'180%'} />
)

const GlobalHeader = ({ searchBar }) => (
  <Flex bg="brand" align="center">
    <Box px={6} py={3}>
      <Link href="/" passHref><a><ServiceLogo /></a></Link>
    </Box>
    <Spacer />
    {searchBar && <SearchBar mr={5} {...searchBar} />}
  </Flex>
)

export default GlobalHeader
