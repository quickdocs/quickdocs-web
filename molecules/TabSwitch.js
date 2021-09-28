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

const itemActiveStyles = {
  borderBottom: '2px',
  borderColor: 'secondary.300',
}

export const Tab = ({ children, active, ...rest }) => (
  <Center {...itemStyles} {...(active ? itemActiveStyles : {})} {...rest}>{children}</Center>
)

const TabContainer = ({ children, ...rest }) => (
  <Box {...containerStyles} {...rest}>{children}</Box>
)

export const TabSwitch = ({ tab, onChange, children, ...rest }) => (
  <Flex {...rest}>
    {React.Children.map(children, (child, i) => (
      <TabContainer>
        {React.cloneElement(child, {
          active: child.props.name === tab,
          onClick: onChange && (() => onChange(child.props.name))
        })}
      </TabContainer>
    ))}
  </Flex>
)

TabSwitch.displayName = 'TabSwitch'

export default TabSwitch
