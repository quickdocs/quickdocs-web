import { Button } from '@chakra-ui/react'

const styles = {
  height: 14,
  border: 3,
  border: '2px',
  borderColor: 'gray.600',
  _hover: { bg: 'gray.600', color: '#fff' },
  _active: { bg: 'brand', color: '#fff' },
}

const CategoryButton = ({ children, ...props }) => (
  <Button variant="outline" {...styles} {...props}>{children}</Button>
)

export default CategoryButton
