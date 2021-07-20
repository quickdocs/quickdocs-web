import { Link } from '@chakra-ui/react'

const styles = {
  display: 'inline-flex',
  appearance: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  height: 14,
  width: '100%',
  fontWeight: 'semibold',
  border: 3,
  border: '2px',
  borderRadius: '5px',
  borderColor: 'gray.600',
  _hover: { bg: 'gray.600', color: '#fff' },
  _active: { bg: 'brand', color: '#fff' },
}

const CategoryButton = ({ children, ...props }) => (
  <Link {...styles} {...props}>{children}</Link>
)

export default CategoryButton
