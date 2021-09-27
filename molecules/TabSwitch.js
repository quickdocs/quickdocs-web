import React, { useState } from 'react'
import { Flex, Center, Box } from '@chakra-ui/react'

const itemStyles = {
  p: '12px',
  fontWeight: 'semibold',
  border: 3,
  cursor: 'pointer',
}

const containerStyles = {
  flex: 1,
  borderBottom: '1px',
  borderColor: 'gray.200',
}

const containerActiveStyles = {
  borderBottom: '2px',
  borderColor: 'secondary.300',
}

export const Tab = ({ children, ...rest }) => (
  <Center {...itemStyles} {...rest}>{children}</Center>
)

const TabContainer = ({ active, children, ...rest }) => (
  <Box {...containerStyles} {...(active ? containerActiveStyles : {})} {...rest}>{children}</Box>
)

export const TabSwitch = ({ children, ...rest }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Flex {...rest}>
      {React.Children.map(children, (child, i) => (
        <TabContainer active={i === activeIndex} onClick={() => setActiveIndex(i)}>{child}</TabContainer>
      ))}
    </Flex>
  )
}

TabSwitch.displayName = 'TabSwitch'

export default TabSwitch
