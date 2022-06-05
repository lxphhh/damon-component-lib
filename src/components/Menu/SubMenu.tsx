// 支持下拉菜单模式
import React, { useContext, FunctionComponentElement, useState, useRef } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { BaseMenuItem } from './MenuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children: React.ReactNode
}

const SubMenu = (props: SubMenuProps) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenu as Array<string>
  const isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpen) // 打开
  const timer = useRef<NodeJS.Timer | null>(null) // 计时器
  // 只在索引存在和竖直模式下起作用
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index, // 选中
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  // 鼠标移入移出事件
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    e.preventDefault()
    timer.current = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  // 点击事件集合 按照mode判断
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}
  // 经过事件
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {}
  // 渲染子元素
  const renderChildren = () => {
    const subMenuClasses = classNames('damon-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, subIndex) => {
      // 子元素类型收窄
      const chirdElement = child as React.FunctionComponentElement<BaseMenuItem>
      const { displayName } = chirdElement.type
      if (displayName === 'MenuItem') {
        // react给后面的子元素追加属性
        return React.cloneElement(chirdElement, { index: `${index}-${subIndex}` })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })

    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      {/* 标题 */}
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {/* 下拉菜单开始 */}
      {renderChildren()}
      {/* 下拉菜单结束 */}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
