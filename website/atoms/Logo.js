import { Text } from '@chakra-ui/react'

const styles = {
  fontFamily: 'Baskerville, "Baskerville Win95BT", "Times New Roman", Times, serif',
  fontWeight: 'bold',
  color: '#fff',
}

const Logo = (props) => <Text {...styles} {...props}>Quickdocs</Text>

export default Logo
