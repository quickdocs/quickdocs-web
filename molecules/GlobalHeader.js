import Link from 'next/link'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Logo from '../atoms/Logo'
import SearchBar from './SearchBar'

const ServiceLogo = ({ searchBar }) => (
  <Box color="white" fontSize={["150%", "150%", "180%"]}>
    <Box display={searchBar ? ['none', 'inline'] : 'inline'} whiteSpace="nowrap"><Logo display="inline" minimum={false} /></Box>
    <Logo display={searchBar ? ["inline", "none"] : 'none'} minimum={true} />
  </Box>
)

const GlobalHeader = ({ searchBar }) => (
  <Flex bg="brand" align="center">
    <Box px={6} py={[2, 2, 3]}>
      <Link href="/" passHref><a><ServiceLogo searchBar={searchBar} /></a></Link>
    </Box>
    <Spacer />
    {searchBar && <SearchBar mr={5} h={[42, 42, 50]} border="none" {...searchBar} />}
  </Flex>
)

export default GlobalHeader
