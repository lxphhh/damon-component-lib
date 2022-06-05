import React from 'react'
import Menu from '../components/Menu/Menu'
import MenuItem from '../components/Menu/MenuItem'
import SubMenu from '../components/Menu/SubMenu'

type Props = {}

const MenuTest = (props: Props) => {
  return (
    <>
      <Menu
        onSelect={(index) => {
          console.log(index, 'index')
        }}
        defaultOpenSubMenu={['2']}
      >
        <MenuItem>1</MenuItem>
        <MenuItem disabled>3</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem disabled>dropdown3disabled</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Menu
        mode="horizontal"
        onSelect={(index) => {
          console.log(index)
        }}
      >
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem disabled>dropdown3disabled</MenuItem>
        </SubMenu>
      </Menu>
    </>
  )
}

export default MenuTest
