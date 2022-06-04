import React from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'

export interface BaseMenuProps {
  defaultIndex: number
  className: string
  mode: MenuMode
  style: React.CSSProperties // react css类型
  children: React.ReactNode
  onSelect: (selectedIndex: number) => void
}

type MenuProps = Partial<BaseMenuProps>

const Menu = (props: MenuProps) => {
  const { children, defaultIndex, className, mode, style, onSelect, ...restProps } = props
  const classes = classNames('damon-menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
