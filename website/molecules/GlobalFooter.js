import { Wrap, WrapItem, Link, Text } from '@chakra-ui/react'

const styles = {
  color: 'primary.100',
  bgColor: 'primary.900',
  align: 'left',
  fontWeight: 'bold',
}

const GlobalFooter = (props) => (
  <footer>
    <Wrap py={50} mt={50} justify="center" spacing={10} {...styles}>
      <WrapItem><Link href="https://github.com/quickdocs">GitHub @quickdocs</Link></WrapItem>
      <WrapItem><Link>Sponsors</Link></WrapItem>
    </Wrap>
  </footer>
)

export default GlobalFooter
