import React from 'react'
import Menu from '../components/Menu/Menu'
import MenuItem from '../components/Menu/MenuItem'

type Props = {}

const MenuTest = (props: Props) => {
  return (
    <Menu
      defaultIndex={0}
      onSelect={(index) => {
        console.log(index)
      }}
    >
      <MenuItem index={0}>1</MenuItem>
      <MenuItem index={1} disabled>
        3
      </MenuItem>
      <MenuItem index={2}>2</MenuItem>
    </Menu>
  )
}

export default MenuTest
