import {
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  Button
} from '@chakra-ui/react'

const SearchBar = (props) => (
  <Flex {...props}>
    <InputGroup>
      <Input variant="filled" placeholder="Search projects" h={55} borderColor="primary.100" borderRight={0} />
      <InputRightAddon p={0} h={55}>
        <Button borderLeftRadius={0} bgColor={'primary.500'} color={'white'} h={55}>Search</Button>
      </InputRightAddon>
    </InputGroup>
  </Flex>
)

export default SearchBar
