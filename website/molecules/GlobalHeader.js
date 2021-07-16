import Logo from '../atoms/Logo'
import { Flex, Box, Spacer } from '@chakra-ui/react'

const ServiceLogo = () => (
  <Logo fontSize={'180%'} />
)

const GlobalHeader = () => (
  <Flex bg="primary.900">
    <Box px={6} py={3}>
      <ServiceLogo />
    </Box>
    <Spacer />
  </Flex>
)

export default GlobalHeader
