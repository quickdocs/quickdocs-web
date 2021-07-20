import { Text } from '@chakra-ui/react'

const styles = {
  fontFamily: 'Baskerville, "Baskerville Win95BT", "Times New Roman", Times, serif',
  fontWeight: 'bold',
  color: '#fff',
}

const Logo = ({ minimum, ...props}) => (
  <Text {...styles} {...props}>{minimum ? 'Q' : 'Quickdocs'}</Text>
)

export default Logo
