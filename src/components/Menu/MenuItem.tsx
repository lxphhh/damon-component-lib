import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface BaseMenuItem {
  index?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const MenuItem = (props: BaseMenuItem) => {
  // 消费
  const context = useContext(MenuContext)
  const { index, disabled, className, style, children } = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })

  const handleClick = () => {
    // disable不允许调用
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem' // 限制
export default MenuItem
