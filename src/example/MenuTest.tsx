import React from 'react'
import Menu from '../components/Menu/Menu'
import MenuItem from '../components/Menu/MenuItem'

type Props = {}

const MenuTest = (props: Props) => {
  return (
    <>
      <Menu
        defaultIndex={0}
        onSelect={(index) => {
          console.log(index)
        }}
      >
        <MenuItem>1</MenuItem>
        <MenuItem disabled>3</MenuItem>
        <MenuItem>2</MenuItem>
      </Menu>
      <hr />
      <Menu
        defaultIndex={0}
        mode="horizontal"
        onSelect={(index) => {
          console.log(index)
        }}
      >
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
      </Menu>
    </>
  )
}

export default MenuTest
