import React from 'react'
import classNames from 'classnames'

export interface BaseMenuItem {
  index: number
  disabled: boolean
  className: string
  children: React.ReactNode
  style: React.CSSProperties
}

type MenuItemProps = Partial<BaseMenuItem>

const MenuItem = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem
