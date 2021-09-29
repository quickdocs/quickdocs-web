import { Wrap, WrapItem, Link, Text } from '@chakra-ui/react'

const styles = {
  color: 'primary.100',
  bgColor: 'brand',
  align: 'left',
  fontWeight: 'bold',
}

const GlobalFooter = (props) => (
  <footer>
    <Wrap py={[10, 10, 50]} mt={30} justify="center" spacing={[6, 6, 10]} {...styles}>
      <WrapItem><Link href="https://github.com/quickdocs">GitHub</Link></WrapItem>
      <WrapItem><Link href="https://www.quicklisp.org/beta/">Quicklisp</Link></WrapItem>
    </Wrap>
  </footer>
)

export default GlobalFooter
