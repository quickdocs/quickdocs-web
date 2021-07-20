import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  Button
} from '@chakra-ui/react'

const SearchBar = ({ keyword, ...props }) => {
  const [query, setQuery] = useState(keyword)
  const router = useRouter()
  const handleChange = (event) => setQuery(event.target.value)
  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex {...props}>
        <InputGroup>
          <Input variant="filled" placeholder="Search projects" h={50} _focus={{ bgColor: 'white' }} borderColor="primary.300" borderRight={0} value={query} onChange={handleChange} />
          <InputRightAddon p={0} h={50} border="none">
            <Button type="submit" borderLeftRadius={0} bgColor={'primary.500'} _hover={{ bg: 'primary.600' }} _active={{ bg: 'primary.700' }} color={'white'} h={50}>Search</Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </form>
  )
}

export default SearchBar
