import React from 'react'
import Menu from '../components/Menu/Menu'
import MenuItem from '../components/Menu/MenuItem'
import SubMenu from '../components/Menu/SubMenu'

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
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem disabled>dropdown3</MenuItem>
        </SubMenu>
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
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem disabled>dropdown3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  )
}

export default MenuTest
