// 支持下拉菜单模式
import React, { useContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { BaseMenuItem } from './MenuItem'

export interface SubMenuProps {
  index?: number
  title: string
  className?: string
  children: React.ReactNode
}

const SubMenu = (props: SubMenuProps) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index, // 选中
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      // 子元素类型收窄
      const chirdElement = child as React.FunctionComponentElement<BaseMenuItem>
      const { displayName } = chirdElement.type
      if (displayName === 'MenuItem') {
        // react给后面的子元素追加属性
        return React.cloneElement(chirdElement, { index })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })

    return <ul className="damon-submenu">{childrenComponent}</ul>
  }
  return (
    <li key={index} className={classes}>
      {/* 标题 */}
      <div className="submenu-title">{title}</div>
      {/* 下拉菜单开始 */}
      {renderChildren()}
      {/* 下拉菜单结束 */}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
