import { Button } from '@chakra-ui/react'

const styles = {
  height: 14,
  border: 3,
  border: '2px',
  borderColor: 'primary',
}

const CategoryButton = ({ children, ...props }) => (
  <Button variant="outline" {...styles} {...props}>{children}</Button>
)

export default CategoryButton
